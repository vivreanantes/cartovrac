import {newMap, addMarkerToMap} from './map.js';
import {categories, shopDataFiles, itinerantFileName} from './data.js';
import {getPopupContent} from './popup.js';


/**
 * Create a map in given div id and populate it for given countries
 * @param countries array of countries to populate with bulk purchase shops
 * @param divId the id of the div that will include the map
 */
export function createMapAndPopulate(divId, countries, mapConfig) {
	var cluster = newMap(divId, mapConfig, categories);
	countries.forEach(function(country) {
	 	var shopsJson;
		$.when(
		    $.getJSON(shopDataFiles[country].fileName, function(response) {
		        shopsJson = response.elements
		    })
		).then(function() {
			populate(shopsJson, cluster);
		});
	});

	var itinerantShopsJson;
	$.when(
	    $.getJSON(itinerantFileName, function(response) {
	        itinerantShopsJson = response.elements
	        console.log("iti");
	    })
	).then(function() {
		populate(itinerantShopsJson, cluster);
	});
}

/**
 * Display the shops
 **/
function populate(shopsJson, cluster) {
	for (var shopIndex in shopsJson) {
		var shop = shopsJson[shopIndex]
		var tags = shop['tags'];
		var isAWay = isElementAWay(shop);
		var position = getPosition(shop, isAWay);
    	var type = tags['shop'] || tags['amenity'] || tags['craft'];
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
			addMarkerToMap(category, cluster, popup, position);
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
