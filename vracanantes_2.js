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
	//	maxBounds: bounds
	});

// Add branding and license links
L.tileLayer(
	'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', 
	{
		attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
		maxZoom: maxZoom,
		id: 'mapbox/streets-v11',
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
		var typeArray = getTypeRepair(
			repairTags['fabrik:repair'], repairTags['service:fabrik:repair'],
			repairTags['bicycle:repair'], repairTags['service:bicycle:repair'],
			repairTags['camera:repair'], repairTags['service:camera:repair'],
			repairTags['computer:repair'], repairTags['service:computer:repair'],
			repairTags['fabrik:repair'], repairTags['service:fabrik:repair'],
			repairTags['furniture:repair'], repairTags['service:furniture:repair'],
			repairTags['small_electronics_device:repair'], repairTags['service:small_electronics_device:repair'],
			);

		// Check if there is at least one type matching
		if (typeArray == 0) {
			continue;
		}

		// Create popup content depending on element's tags
		var popup = getPopupContent(
				shop['id'],
				repairTags['name'],
				repairTags['collaborative_repair_shop'],
				repairTags['contact:housenumber'],
				repairTags['contact:street'],
				repairTags['contact:postcode'],
				repairTags['contact:city'],
				repairTags['opening_hours'],
				repairTags['contact:email'],
				repairTags['contact:facebook'],
				repairTags['contact:phone'],
				repairTags['contact:website'],
				repairTags['website'],
				repairTags['description:fr'],
				repairTags['contact:neighbourhood'],
				repairTags['contact:calendar'],
				repairTags['brand'],
				typeArray
		);

		// Check that popup has been correctly created
		if (popup && lat && lon) {
			addMarkerToMap(typeArray, popup, lat, lon);
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
		opening_hours,
		email,
		facebook,
		phone,
		website,
		website2,
		description,
		neighbourhood,
		calendar,
		brand,
		typeArray
){
	// Check that name exists
	if (!name) {
		return null;
	}
	var popup = '<b>'+name+'</b>';
	if (neighbourhood) {
		popup += '<i> - '+neighbourhood+'</i>';
	}
	popup += "<br/>";
	if (brand==="Repair Café") {
		popup += '<i>Signataire Charte des Repair Cafés</i><br />';
	}
	// Set the shop type
	// var shopTitle = getShopTitle(typeArray, collaborative_repair_shop, neighbourhood);
	if (description) {
		popup += '<i>'+description+'</i><br />';
	}
	popup += getHtmlFormattedAddress(housenumber, street, postcode, city);
	popup += getHtmlFormattedHours(opening_hours);
	if (phone) {
		popup += "Tél : " + phone+'<br />';
	}
	if (facebook) {
		popup += getHtmlFormattedWebsite("Facebook", facebook);
	}
	popup += getHtmlFormattedWebsite("Site web", website);
	popup += getHtmlFormattedWebsite("Site web", website2);
	popup += getHtmlFormattedCalendar_2(nodeId);
	popup += getHtmlFormattedPartnerships(nodeId);
	popup += getHtmlFormattedContribution(nodeId);
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
