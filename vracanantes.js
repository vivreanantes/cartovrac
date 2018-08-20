// Bounds for display
var boundS = 40;
var boundW = -5.5;
var boundN = 53;
var boundE = 8;
var bounds = new L.LatLngBounds(new L.LatLng(boundN, boundE), new L.LatLng(boundS, boundW));

// Map definition
var maxZoom = 17;
var minZoom = 5;
var defaultZoom = 10;
var mapCenter = new L.latLng(47.25,-1.56);
var map = L.map('map', {
		fullscreenControl: true,
		center: mapCenter,
		zoom: defaultZoom,
		minZoom: minZoom,
		maxZoom: maxZoom,
		maxBounds: bounds
	});

// Add branding and license links
L.tileLayer(
	'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', 
	{
		attribution: 'Map data &copy; '+
			'<a href="http://openstreetmap.org">OpenStreetMap</a> contributors, '+
			'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, '+
			'Imagery © <a href="http://mapbox.com">Mapbox</a>',
		maxZoom: maxZoom,
		id: 'mapbox.streets',
		accessToken: 'pk.eyJ1IjoidnJhY2FuYW50ZXMiLCJhIjoiY2psMmtneDllMWowNDN3cDR6NGtwbmk5MyJ9.BLI4o0qCMZBck7mdYcUhuA'
	}
).addTo(map);

/**
 * Load data from cache first
 */
var shopsJson, jtbPartners;
$(document).ready(function(){
	initSubGroups(map);
	
	$.when(
	    $.getJSON('cache_data.json', function(response) {
	        shopsJson = response.elements
	    }),
	    $.getJSON('jtb_partners.json', function(response) {
	        jtbPartners = response.elements
	    })
	).then(function() {
	    addListOfShops();
	});
});

/**
 * Take a list of shops as JSON and display them in a cluster on the map
 **/
function addListOfShops() {	
	for (var shopIndex in shopsJson) {
		var shop = shopsJson[shopIndex]
		//var shopTags = shop['tags'];
		var repairTags = shop['tags'];
		var lat, lon;

		// Get coordinates
		if (shop['type'] == "way") {
			// As ways are a list of nodes, we have to get the center node
			var shopCenter = shop['center'];
			if (shopCenter) {
				lat = shopCenter['lat'];
				lon = shopCenter['lon'];
			}	
		} else {
			lat = shop['lat'];
			lon = shop['lon'];
		}

		// check minimum information to display a marker
		if (!lat || !lon) {
			continue;
		}

		// Get the type of shop/amenity to manage
		var type = getTypeRepair(repairTags['service:fabrik:repair'], repairTags['service:bicycle:repair'], repairTags['service:camera:repair'], repairTags['service:computer:repair'], repairTags['service:fabrik:repair'], repairTags['service:furniture:repair'], repairTags['service:small_electronics_device:repair']);
				
		if (!type) {
			continue;
		}

		// Create popup content depending on element's tags
		var popup = getPopupContent(
				shop['id'],
				repairTags['name'],
				repairTags['collaborative_repair_shop'],
				repairTags['addr:housenumber'],
				repairTags['addr:street'],
				repairTags['addr:postcode'],
				repairTags['addr:city'],
				repairTags['service_times'],
				repairTags['contact:email'],
				repairTags['contact:facebook'],
				repairTags['contact:phone'],
				repairTags['contact:website'],
				repairTags['description:fr'],
				type
		);

		// Check that popup has been correctly created
		if (popup && lat && lon) {
			addMarkerToMap(type, popup, lat, lon);
		}
	}
}

/**
 * Format shop information into an html style string for the popup
 **/
function getPopupContent(
		nodeId,
		name,
		collaborative_repair_shop,
		housenumber,
		street,
		postcode,
		city,
		service_times,
		email,
		facebook,
		phone,
		website,
		description,
		type
){
	// Check that name exists
	if (!name) {
		return null;
	}
	var popup = '<b>'+name+'</b><br />';

	// Set the shop type
	var shopTitle = getShopTitle(type, collaborative_repair_shop);
	if (description) {
		popup += '<i>'+description+'</i><br />';
	}
	popup += getHtmlFormattedAddress(housenumber, street, postcode, city);	
	popup += getHtmlFormattedHours(service_times);
	if (phone) {
		popup += phone+'<br />';
	}
	if (facebook) {
		popup += getHtmlFormattedWebsite(facebook);
	}
	if (phone) {
		popup += phone+'<br />';
	}
	popup += getHtmlFormattedWebsite(website);
	popup += getHtmlFormattedPartnerships(nodeId);
	return popup;
}

/**
 * @return an HTML formatted list of partners
 */
function getHtmlFormattedPartnerships(nodeId) {
	var partners = "";

	if (isJaimeTesBocauxPartner(nodeId)){
	    partners += '<hr style="padding-bottom: ;padding-bottom: 0px;" size="1">';
	    partners += '<div style="display: flex;"><img style="height: 50px;" src="jtb.png"/><div style="margin: auto; font-weight: bold;">Partenaire <br />J\'aime tes bocaux</div></div>';
    }

	return partners;
}

/**
 * Check if the shop is a partner of the organization "J'aime tes bocaux"
 * @param nodeId the id of the element
 * @return true if it's a "J'aime tes bocaux" partner, false otherwise
 */
function isJaimeTesBocauxPartner(nodeId) {

    for (var groupIndex in jtbPartners) {
    	var group = jtbPartners[groupIndex];
		for (var idIndex in group.ids) {
			var id = group.ids[idIndex];
			if (id == nodeId) {
	       		return true;
	       	}
		}
	}

 	return false;
}
