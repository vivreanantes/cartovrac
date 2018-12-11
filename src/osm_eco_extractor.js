import {newMap, addMarkerToMap} from './map.js';
import {categories, shopDataFiles, itinerantFileName} from './data.js';
import {getPopupContent} from './popup.js';

// Leaflet icons for the different types of shop
var ShopIcon = L.Icon.extend({
    options: {
      shadowUrl: require('../assets/img/marker-shadow.png'),
      iconSize: [35, 57],
      iconAnchor: [15, 57],
      popupAnchor: [3, -58],
      shadowSize: [50, 50]
  }
});

/**
 * Create a map in given div id and populate it for given countries
 * @param countries array of countries to populate with bulk purchase shops
 * @param divId the id of the div that will include the map
 */
export function createMapAndPopulate(divId, countries, mapConfig) {
	var map = newMap(divId, mapConfig, categories);

	prepareCaterogiesSubgroupsAndIcons(map);

	countries.forEach(function(country) {
	 	var shopsJson;
		$.when(
		    $.getJSON(shopDataFiles[country].fileName, function(response) {
		        shopsJson = response.elements
		    })
		).then(function() {
			populate(shopsJson);
		});
	});

	var itinerantShopsJson;
	$.when(
	    $.getJSON(itinerantFileName, function(response) {
	        itinerantShopsJson = response.elements
	    })
	).then(function() {
		populate(itinerantShopsJson);
	});
}

/**
 * Prepare the Leaflet icon and subgroup for each category and add them on the map
 **/
function prepareCaterogiesSubgroupsAndIcons(map) {
	// Create a cluster for all markers
	var cluster = new L.MarkerClusterGroup({maxClusterRadius: 50}).addTo(map);

	// add a subgroup per category
	var overallGroupLabel = "Tous les commerces";
	var groupedOverlays = {[overallGroupLabel]: {} };

	for (var key in categories) {
		var category = categories[key];

		// Prepare icon and subgroup
		category.icon = new ShopIcon({iconUrl: category.iconUrl});
		category.subgroup = new L.featureGroup.subGroup(cluster, null).addTo(map);

		var key = '<img src="'+category.iconUrl+'" height="30px" style="margin-left: 2px; margin-right: 4px; margin-top: 8px; margin-bottom: -7px;"/>'+category.prefix;
		groupedOverlays[overallGroupLabel][key] = category.subgroup;
	}

	L.control.groupedLayers(null, groupedOverlays).addTo(map);
}

/**
 * Display the shops
 **/
function populate(shopsJson) {
	for (var shopIndex in shopsJson) {
		var shop = shopsJson[shopIndex]
		var tags = shop['tags'];
		var isAWay = isElementAWay(shop);
		var position = getPosition(shop, isAWay);
    	var type = tags['shop'] || tags['amenity'] || tags['craft'];

    	// Special type for bulk purchase only
    	if (type == "convenience" && tags['bulk_purchase'] == "only") {
    		type = "only_bulk_convenience";
    	}

		var category = categories[type];
		var suffix = null;

		// Check shop validity
		if (!type || !category || !tags['name']) {
			console.log('Problem when displaying ' + (isAWay ? 'way ' : 'node ') + 
				shop['id'] + ' of type ' + type + ' ; name ' + tags['name']);
			continue;
		}

		// Create popup content depending on element's tags
		var popup = getPopupContent(
			shop['id'],
			tags['name'],
			tags['organic'],
			tags['bulk_purchase'],
			tags['addr:housenumber'],
			tags['addr:street'],
			tags['addr:postcode'],
			tags['addr:city'],
			tags['opening_hours'],
			tags['website'],
			tags['contact:website'],
			tags['facebook'],
			tags['contact:facebook'],
			category.prefix,
			suffix,
			isAWay
		);

		// Check that popup has been correctly created
		if (popup) {
			addMarkerToMap(category, popup, position);
		}
	}
}

/**
 * Decide where the shop should be displayed, either on the spot or in the
 * center of a way
 */
function getPosition(shop, isAWay) {
	var reference = isAWay ? shop['center'] : shop;
	return {lat: reference['lat'], lon: reference['lon']};
}

/**
 * Check if the shop json information is a node or a way
 */
function isElementAWay(shop) {
	return (shop['type'] == 'way' && shop['center']);
}
