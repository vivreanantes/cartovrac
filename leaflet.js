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
	5460468439,
	5518872681,
	5460362739,
	2672093889,
	5333494928,
	4267907899,
	2416353080,
	4201236594,
	4199637816,
	475385271,
	4917847921,
	2393205127,
	5528055528,
	5536163901,
	2258874082,
	4829754273
];

// Icons
var iconSize = [35, 57];
var iconAnchor = [15, 57];
var popupAnchor = [3, -58];
var	shadowSize = [50, 50];
var shadowUrl = 'marker-shadow.png';

var convenienceIcon = new L.Icon({
	iconUrl: 'icons/icon_convenience.png',
  	shadowUrl: shadowUrl,
  	iconSize: iconSize,
  	iconAnchor: iconAnchor,
  	popupAnchor: popupAnchor,
  	shadowSize: shadowSize
});

var supermarketIcon = new L.Icon({
	iconUrl: 'icons/icon_supermarket.png',
  	shadowUrl: shadowUrl,
  	iconSize: iconSize,
  	iconAnchor: iconAnchor,
  	popupAnchor: popupAnchor,
  	shadowSize: shadowSize
});

var butcherIcon = new L.Icon({
	iconUrl: 'icons/icon_butcher.png',
  	shadowUrl: shadowUrl,
  	iconSize: iconSize,
  	iconAnchor: iconAnchor,
  	popupAnchor: popupAnchor,
  	shadowSize: shadowSize
});

var dairyIcon = new L.Icon({
	iconUrl: 'icons/icon_dairy.png',
  	shadowUrl: shadowUrl,
  	iconSize: iconSize,
  	iconAnchor: iconAnchor,
  	popupAnchor: popupAnchor,
  	shadowSize: shadowSize
});

var greengrocerIcon = new L.Icon({
	iconUrl: 'icons/icon_greengrocer.png',
  	shadowUrl: shadowUrl,
  	iconSize: iconSize,
  	iconAnchor: iconAnchor,
  	popupAnchor: popupAnchor,
  	shadowSize: shadowSize
});

var chocolateIcon = new L.Icon({
	iconUrl: 'icons/icon_chocolate.png',
  	shadowUrl: shadowUrl,
  	iconSize: iconSize,
  	iconAnchor: iconAnchor,
  	popupAnchor: popupAnchor,
  	shadowSize: shadowSize
});

var bakeryIcon = new L.Icon({
	iconUrl: 'icons/icon_bakery.png',
  	shadowUrl: shadowUrl,
  	iconSize: iconSize,
  	iconAnchor: iconAnchor,
  	popupAnchor: popupAnchor,
  	shadowSize: shadowSize
});

var coffeeShopIcon = new L.Icon({
	iconUrl: 'icons/icon_coffeeShop.png',
  	shadowUrl: shadowUrl,
  	iconSize: iconSize,
  	iconAnchor: iconAnchor,
  	popupAnchor: popupAnchor,
  	shadowSize: shadowSize
});

var pastryIcon = new L.Icon({
	iconUrl: 'icons/icon_pastry.png',
  	shadowUrl: shadowUrl,
  	iconSize: iconSize,
  	iconAnchor: iconAnchor,
  	popupAnchor: popupAnchor,
  	shadowSize: shadowSize
});

var deliIcon = new L.Icon({
	iconUrl: 'icons/icon_deli.png',
  	shadowUrl: shadowUrl,
  	iconSize: iconSize,
  	iconAnchor: iconAnchor,
  	popupAnchor: popupAnchor,
  	shadowSize: shadowSize
});

var teaIcon = new L.Icon({
	iconUrl: 'icons/icon_tea.png',
  	shadowUrl: shadowUrl,
  	iconSize: iconSize,
  	iconAnchor: iconAnchor,
  	popupAnchor: popupAnchor,
  	shadowSize: shadowSize
});

var confectioneryIcon = new L.Icon({
	iconUrl: 'icons/icon_confectionery.png',
  	shadowUrl: shadowUrl,
  	iconSize: iconSize,
  	iconAnchor: iconAnchor,
  	popupAnchor: popupAnchor,
  	shadowSize: shadowSize
});

var seafoodIcon = new L.Icon({
	iconUrl: 'icons/icon_seafood.png',
  	shadowUrl: shadowUrl,
  	iconSize: iconSize,
  	iconAnchor: iconAnchor,
  	popupAnchor: popupAnchor,
  	shadowSize: shadowSize
});

var agrarianIcon = new L.Icon({
	iconUrl: 'icons/agrarian.png',
  	shadowUrl: shadowUrl,
  	iconSize: iconSize,
  	iconAnchor: iconAnchor,
  	popupAnchor: popupAnchor,
  	shadowSize: shadowSize
});

var fastFoodIcon = new L.Icon({
	iconUrl: 'icons/icon_fast_food.png',
  	shadowUrl: shadowUrl,
  	iconSize: iconSize,
  	iconAnchor: iconAnchor,
  	popupAnchor: popupAnchor,
  	shadowSize: shadowSize
});

var restaurantIcon = new L.Icon({
	iconUrl: 'icons/icon_restaurant.png',
  	shadowUrl: shadowUrl,
  	iconSize: iconSize,
  	iconAnchor: iconAnchor,
  	popupAnchor: popupAnchor,
  	shadowSize: shadowSize
});

var cafeAmenityIcon = new L.Icon({
	iconUrl: 'icons/icon_cafeAmenity.png',
  	shadowUrl: shadowUrl,
  	iconSize: iconSize,
  	iconAnchor: iconAnchor,
  	popupAnchor: popupAnchor,
  	shadowSize: shadowSize
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
				shopTags['craft'],
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
		var icon = getIcon(shopTags['shop'], shopTags['amenity'], shopTags['craft']);

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
		craft,
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
	var shopTitle = getShopTitle(name, amenity, craft, shopType, organic, bulk_purchase);
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

function getShopTitle(name, amenity, craft, shopType, organic, bulk_purchase) {
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
	} else if (amenity == "fast_food") {
		title += 'Fast-food';
	}  else if (amenity == "restaurant") {
		title += 'Restaurant';
	} else if (amenity == "cafe") {
		title += 'Café';
	} else if (craft == "caterer") {
		title += 'Traiteur';
	} else {
		console.log("Unknown shop type with name="+name+" ; type="+shopType+" and amenity="+amenity);
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

/**
 * Get the icon that matches the shop type
 */
 function getIcon(shopType, amenity, craft) {
 	var icon;

 	if (shopType == "convenience") {
		icon = {icon: convenienceIcon};
	} else if (shopType == "supermarket") {
		icon = {icon: supermarketIcon};
	} else if (shopType == "butcher") {
		icon = {icon: butcherIcon};
	} else if (shopType == "dairy" || shopType == "cheese") {
		icon = {icon: dairyIcon};
	} else if (shopType == "greengrocer") {
		icon = {icon: greengrocerIcon};
	} else if (shopType == "chocolate") {
		icon = {icon: chocolateIcon};
	} else if (shopType == "bakery") {
		icon = {icon: bakeryIcon};
	} else if (shopType == "coffee") {
		icon = {icon: coffeeShopIcon};
	} else if (shopType == "pastry") {
		icon = {icon: pastryIcon};
	} else if (shopType == "deli") {
		icon = {icon: deliIcon};
	} else if (shopType == "tea") {
		icon = {icon: teaIcon};
	} else if (shopType == "confectionery") {
		icon = {icon: confectioneryIcon};
	} else if (shopType == "seafood") {
		icon = {icon: seafoodIcon};
	} else if (shopType == "agrarian") {
		icon = {icon: agrarianIcon};
	} else if (amenity == "fast_food") {
		icon = {icon: fastFoodIcon};
	} else if (amenity == "restaurant") {
		icon = {icon: restaurantIcon};
	} else if (amenity == "cafe") {
		icon = {icon: cafeAmenityIcon};
	} else if (craft == "caterer") {
		icon = {icon: restaurantIcon};
	} else {
		icon = null;
	}
 	
 	return icon;
 }
