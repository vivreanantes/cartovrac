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

// Bound for search
var boundSearchS = 46.9;
var boundSearchW = -2.7;
var boundSearchN = 47.9;
var boundSearchE = -0.4;

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


$.ajax({
    url:
        'https://www.overpass-api.de/api/interpreter?data=' + 
        '[out:json][timeout:25][maxsize:10737418];' +
	'node["bulk_purchase"="yes"]('+boundSearchS+','+boundSearchW+','+boundSearchN+','+boundSearchE+');out;'+
	'node["bulk_purchase"="only"]('+boundSearchS+','+boundSearchW+','+boundSearchN+','+boundSearchE+');out;'+
	'way["bulk_purchase"="yes"]('+boundSearchS+','+boundSearchW+','+boundSearchN+','+boundSearchE+');out center;'+
	'way["bulk_purchase"="only"]('+boundSearchS+','+boundSearchW+','+boundSearchN+','+boundSearchE+');out center;',
    dataType: 'json',
    type: 'GET',
    async: true,
    crossDomain: true
}).done(function(response) {
	addListOfShops(response.elements);
}).fail(function(error) {
    console.log(error);
    alert('Impossible de récupérer les données :/');
}).always(function() {});

/**
 * Take a list of shops as JSON and display them in a cluster on the map
 **/
function addListOfShops(shopsJson) {
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

		// Get shop information
		var name = shopTags['name'];
		var shopType = shopTags['shop'];
		var bulk_purchase = shopTags['bulk_purchase'];

		// check minimum information to display a marker
		if (!lat || !lon || !name || !shopType) {
			continue
		}

		// Create popup content depending on element's tags
		var popup = getPopupContent(
				name,
				shopType,
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
 * Format shop information into an html style string for the popup
 **/
function getPopupContent(
		name,
		shopType,
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
	popup += '<i>';

	if (shopType == "convenience") {
		popup += 'Épicerie';
	} else if (shopType == "supermarket") {
		popup += 'Supermarché';
	}

	if (organic == "yes" || organic == "only") {
		popup += ' bio.';
	}

	if (bulk_purchase == "yes") {
		popup += ' avec rayon vrac';
	} else if (bulk_purchase == "only") {
		popup += ' 100% vrac';
	}

	if (name == "Green Shopper") {
		popup += ' en ligne';	
	}

	popup += '</i><br />';
		
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

	return popup;
}
