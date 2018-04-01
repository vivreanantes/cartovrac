// List of J'aime tes bocaux partner OSM nodes
var jtbPartners = [
	5456625523, 
	1619954291, 
	3474743920, 
	3474835770, 
	3474835769, 
	1619954323, 
	5456638652, 
	1619954233, 
	3470086335, 
	5459152854, 
	1727920548, 
	3094180230, 
	2255955928, 
	5460145598, 
	4394780789, 
	476294585, 
	2258874087, 
	5460210375, 
	2607658264, 
	2289128176, 
	2258874081, 
	2485095784, 
	3125795830, 
	5460269733, 
	5277827989, 
	5460303725, 
	2607658274, 
	2255955928, 
	5460375747, 
	5460383333, 
	5066198364, 
	5460390736, 
	1034073369, 
	4201236610, 
	2320443633, 
	5460433357, 
	224599086, 
	5460439635, 
	2583958955, 
	5053854903, 
	3683626198, 
	364694509, 
	1688797566, 
	5460448714, 
	2759353718, 
	5460452139, 
	5418567639, 
	5460462886, 
	5460468439
];

// Icon for supermarkets & conveniences having a bulk section
var onlyBulkIcon = new L.Icon({
	iconUrl: 'marker_bulk_only_icon.png',
  	shadowUrl: 'marker-shadow.png',
  	iconSize: [35, 57],
  	iconAnchor: [15, 57],
  	popupAnchor: [3, -58],
  	shadowSize: [50, 50]
});

// Bounds for display
var boundS = 46.9;
var boundW = -2.7;
var boundN = 48.1;
var boundE = -0.4;
var bounds = new L.LatLngBounds(new L.LatLng(boundN, boundE), new L.LatLng(boundS, boundW));

// Map definition
var maxZoom = 18;
var minZoom = 9;
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
		accessToken: 'pk.eyJ1IjoidnJhY2FuYW50ZXMiLCJhIjoiY2phMWt6OWs4NmYzYTJ3bXZrOGQxdWN0byJ9.piPFvSPQ9QoA0QsL7SIgkQ'
	}
).addTo(map);


/**
 * Load data from cache first
 */
$(document).ready(function(){
    $.getJSON('cache_data.json', function(response) {
        addListOfShops(response.elements);
    })
});

/**
 * Take a list of shops as JSON and display them in a cluster on the map
 **/
function addListOfShops(shopsJson) {
	var cluster = new L.MarkerClusterGroup();
		
	for (var shopIndex in shopsJson) {
		var shop = shopsJson[shopIndex]
		var shopTags = shop['tags'];
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

		// Get shop information
		var name = shopTags['name'];
		var bulk_purchase = shopTags['bulk_purchase'];

		// check minimum information to display a marker
		if (!lat || !lon || !name) {
			continue
		}

		// Create popup content depending on element's tags
		var popup = getPopupContent(
				shop['id'],
				name,
				shopTags['shop'],
				shopTags['amenity'],
				shopTags['organic'],
				bulk_purchase,
				shopTags['addr:housenumber'],
				shopTags['addr:street'],
				shopTags['addr:postcode'],
				shopTags['addr:city'],
				shopTags['opening_hours'],
				shopTags['website']
		);

		// Create icon depending on the shop type
		var icon = {icon: onlyBulkIcon}

		// Add marker and popup to the cluser
		cluster.addLayer(L.marker(new L.latLng(lat,lon), icon).bindPopup(popup));
	}

	// Add the cluster
	map.addLayer(cluster);
}

/**
 * Format shop information into an html style string for the popup
 **/
function getPopupContent(
		nodeId,
		name,
		shopType,
		amenity,
		organic,
		bulk_purchase,
		housenumber,
		street,
		postcode,
		city,
		hours,
		website
){
	var popup = '<b>'+name+'</b><br />';

	// Set the shop type
	var shopTitle = getShopTitle(name, amenity, shopType, organic, bulk_purchase);
	if (shopTitle) {
		popup += shopTitle + '<br />';
	}
		
	// Set the address	
	if (street && housenumber) {
		popup += housenumber+' '+street+'<br />';
	} else if (street) {
		popup += street+'<br />';
	}
				
	if (city && postcode) {
		popup += postcode+' '+city+'<br />';
	} else if (city) {
		popup += city+'<br />';
	}
		
	// Set the hours		
	if (hours) {	
		popup += '<b>Horaires</b><br />';
		var hoursSplit = hours.split('; ');
		
		for (var hoursIndex in hoursSplit) {
			popup += getReadableHours(hoursSplit[hoursIndex]) + '<br />';
		}
	}
	
	// Set the website
	if (website) {
		popup +='<a href="' + website + '" target="_blank">Site web</a><br />';
	}

	// Show as J'aime tes bocaux partner if it's the case
    if ($.inArray(nodeId, jtbPartners) > 0){
	    popup += '<hr style="padding-bottom: ;padding-bottom: 0px;" size="1">';
	    popup += '<div style="display: flex;"><img style="height: 50px;" src="jtb.png"/><div style="margin: auto; font-weight: bold;">Partenaire <br />J\'aime tes bocaux</div></div>';
    }

	return popup;
}

function getShopTitle(name, amenity, shopType, organic, bulk_purchase) {
	// Start text with italic style
	var title = '<i>';

	// Set the shop type
	if (shopType == "convenience") {
		title += 'Épicerie';
	} else if (shopType == "supermarket") {
		title += 'Supermarché';
	} else if (shopType == "butcher") {
		title += 'Boucherie';
	} else if (shopType == "dairy" || shopType == "cheese") {
		title += 'Crèmerie';
	} else if (shopType == "greengrocer") {
		title += 'Primeur';
	} else if (shopType == "chocolate") {
		title += 'Chocolatier';
	} else if (shopType == "bakery") {
		title += 'Boulangerie';
	} else if (shopType == "coffee") {
		title += 'Torrefacteur';
	} else if (shopType == "pastry") {
		title += 'Pâtisserie';
	} else if (shopType == "deli") {
		title += 'Épicerie fine';
	} else if (shopType == "tea") {
		title += 'Magasin de thé';
	} else if (shopType == "confectionery") {
		title += 'Confiserie';
	} else if (shopType == "seafood") {
		title += 'Poissonerie';
	} else if (shopType == "agrarian") {
		title += 'Ferme';
	} else if (shopType != null) {
		title += 'Commerce';
	} else if (amenity == "fast_food") {
		title += 'Fast-food';
	}  else if (amenity == "restaurant") {
		title += 'Restaurant';
	} else {
		log("Unknown shop type with name="+name+" ; type="+shopType+" and amenity="+amenity)
		return null;
	}

	// Add annotation if products are organics
    var hasOrganicProducts = organic == "yes" || organic == "only";
	if (hasOrganicProducts) {
		title += ' bio.';
	}


	// Add different suffixe depending if it's a shop selling some bulk products or mainly bulk products
    var hasOnlyBulkProducts = bulk_purchase == "only";
	var hasBulkSection = bulk_purchase == "yes" || hasOnlyBulkProducts;
		
	if (hasBulkSection) {
		if (bulk_purchase == "only") {
			title += ' 100% vrac';
		} else {
			title += ' avec rayon vrac';
		}

		if (name == "Green Shopper") {
			title += ' en ligne';	
		}
	} else {
		title += ' acceptant vos contenants';
	}

	// Close text with style
	title += '</i>';

	return title;
}

/**
 * Transform OpenStreetMap hours into french readable hours
 **/
function getReadableHours(hours){
	return hours.replace("Mo", "Lundi")
		.replace("Tu", "Mardi")
		.replace("We", "Mercredi")
		.replace("Th", "Jeudi")
		.replace("Fr", "Vendredi")
		.replace("Sa", "Samedi")
		.replace("Su", "Dimanche")
		.replace("off", "fermé")
		.replace(",", " & ");
}
