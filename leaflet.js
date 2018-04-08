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


var ShopEnum = {
  CONVENIENCE: 1,
  SUPERMARKET: 2,
  BUTCHER: 3,
  DAIRY: 4,
  GREENGROCER: 5,
  BAKERY: 6,
  COFFEE: 7,
  PASTRY: 8,
  DELI: 9,
  TEA: 10,
  CONFECTIONERY: 11,
  SEAFOOD: 12,
  AGRARIAN: 13,
  FAST_FOOD: 14,
  RESTAURANT: 15,
  CAFE: 16,
  CATERER: 17,
  CHOCOLATE: 18,
  properties: {
    1: {icon: convenienceIcon, titlePrefix: 'Épicerie'},
    2: {icon: supermarketIcon, titlePrefix: 'Supermarché'},
    3: {icon: butcherIcon, titlePrefix: 'Boucherie'},
    4: {icon: dairyIcon, titlePrefix: 'Crèmerie'},
    5: {icon: greengrocerIcon, titlePrefix: 'Primeur'},
    6: {icon: bakeryIcon, titlePrefix: 'Boulangerie'},
    7: {icon: coffeeShopIcon, titlePrefix: 'Torrefacteur'},
    8: {icon: pastryIcon, titlePrefix: 'Pâtisserie'},
    9: {icon: deliIcon, titlePrefix: 'Épicerie fine'},
    10: {icon: teaIcon, titlePrefix: 'Magasin de thé'},
    11: {icon: confectioneryIcon, titlePrefix: 'Confiserie'},
    12: {icon: seafoodIcon, titlePrefix: 'Poissonerie'},
    13: {icon: agrarianIcon, titlePrefix: 'Ferme'},
    14: {icon: fastFoodIcon, titlePrefix: 'Fast-food'},
    15: {icon: restaurantIcon, titlePrefix: 'Restaurant'},
    16: {icon: cafeAmenityIcon, titlePrefix: 'Café'},
    17: {icon: restaurantIcon, titlePrefix: 'Traiteur'},
    18: {icon: chocolateIcon, titlePrefix: 'Chocolatier'}
  }
};

/**
 * Load data from cache first
 */
var shopsJson, jtbPartners;
$(document).ready(function(){
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
	var cluster = new L.MarkerClusterGroup();
	var bulkOnlySubGroup = L.featureGroup.subGroup(cluster);
	var bulkSubGroup = L.featureGroup.subGroup(cluster);
	var control = L.control.layers(null, null, { collapsed: false });
		
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

		// check minimum information to display a marker
		if (!lat || !lon) {
			continue;
		}

		// Get the type of shop/amenity to manage
		var type = getType(shopTags['name'], shopTags['shop'], shopTags['amenity'], shopTags['craft']);

		// Create popup content depending on element's tags
		var popup = getPopupContent(
				shop['id'],
				shopTags['name'],
				shopTags['organic'],
				shopTags['bulk_purchase'],
				shopTags['addr:housenumber'],
				shopTags['addr:street'],
				shopTags['addr:postcode'],
				shopTags['addr:city'],
				shopTags['opening_hours'],
				shopTags['website'],
				type
		);

		// Check that popup has been correctly created
		if (!popup) {
			continue;
		}

		// Create icon depending on the shop type
		var icon = {icon: ShopEnum.properties[type].icon};

		// Add marker and popup to the cluser
		var marker = L.marker(new L.latLng(lat,lon), icon).bindPopup(popup)
		if (bulk_purchase == "yes") {
			marker.addTo(bulkSubGroup);
		} else if (bulk_purchase == "only") {
			marker.addTo(bulkOnlySubGroup);
		}
	}

	// Add the cluster
	cluster.addTo(map);
	control.addOverlay(bulkOnlySubGroup, 'Vrac uniquement');
	control.addOverlay(bulkSubGroup, 'Avec rayon vrac');
	control.addTo(map);
	bulkOnlySubGroup.addTo(map);
	bulkSubGroup.addTo(map);
}

/**
 * Format shop information into an html style string for the popup
 **/
function getPopupContent(
		nodeId,
		name,
		organic,
		bulk_purchase,
		housenumber,
		street,
		postcode,
		city,
		hours,
		website,
		type
){

	// Check that name exists
	if (!name) {
		return null;
	}

	var popup = '<b>'+name+'</b><br />';

	// Set the shop type
	var shopTitle = getShopTitle(type, organic, bulk_purchase);
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
    if (isJaimeTesBocauxPartner(nodeId)){
	    popup += '<hr style="padding-bottom: ;padding-bottom: 0px;" size="1">';
	    popup += '<div style="display: flex;"><img style="height: 50px;" src="jtb.png"/><div style="margin: auto; font-weight: bold;">Partenaire <br />J\'aime tes bocaux</div></div>';
    }

	return popup;
}

/**
 * Check if the shop is a partner of the organization "J'aime tes bocaux"
 * @param nodeId the id of the element
 * @return true if it's a "J'aime tes bocaux" partner, false otherwise
 */
function isJaimeTesBocauxPartner(nodeId) {
	var matchingPartners = jtbPartners.filter(partner => partner.id == nodeId);
 	return matchingPartners.length > 0;
}

/**
 * Get a title describing the shop type
 */
function getShopTitle(type, organic, bulk_purchase) {
	// Start text with italic style and add prefix depending on type
	var title = '<i>' + ShopEnum.properties[type].titlePrefix;

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
 * Get the type of shop/amenity
 */
 function getType(name, shopType, amenity, craft) {
 	var type;

 	if (shopType == "convenience") {
		type = ShopEnum.CONVENIENCE;
	} else if (shopType == "supermarket") {
		type = ShopEnum.SUPERMARKET;
	} else if (shopType == "butcher") {
		type = ShopEnum.BUTCHER;
	} else if (shopType == "dairy" || shopType == "cheese") {
		type = ShopEnum.DAIRY;
	} else if (shopType == "greengrocer") {
		type = ShopEnum.GREENGROCER;
	} else if (shopType == "chocolate") {
		type = ShopEnum.CHOCOLATE;
	} else if (shopType == "bakery") {
		type = ShopEnum.BAKERY;
	} else if (shopType == "coffee") {
		type = ShopEnum.COFFEE;
	} else if (shopType == "pastry") {
		type = ShopEnum.PASTRY;
	} else if (shopType == "deli") {
		type = ShopEnum.DELI;
	} else if (shopType == "tea") {
		type = ShopEnum.TEA;
	} else if (shopType == "confectionery") {
		type = ShopEnum.CONFECTIONERY;
	} else if (shopType == "seafood") {
		type = ShopEnum.SEAFOOD;
	} else if (shopType == "agrarian") {
		type = ShopEnum.AGRARIAN;
	} else if (amenity == "fast_food") {
		type = ShopEnum.FAST_FOOD;
	} else if (amenity == "restaurant") {
		type = ShopEnum.RESTAURANT;
	} else if (amenity == "cafe") {
		type = ShopEnum.CAFE;
	} else if (craft == "caterer") {
		type = ShopEnum.CATERER;
	} else {
		console.log("Unknown shop type with name="+name+" ; type="+shopType+" ; craft="+craft+" and amenity="+amenity);
		type = null;
	}
 	
 	return type;
 }
