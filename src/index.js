import './map.js';
import './menu.js';

var Embedded = require('./embedded.js');

import 'typeface-roboto';

import style from "../assets/stylesheets/styles.css";


import {newMap, addMarkerToMap} from './map.js';
import {getPopupContent} from './popup.js';
import {categories} from './data.js';
import * as config from './config.js';
import {elements as shops} from '../cache_data.json';

checkEmbbededMode();
populate();

/**
 * Activated embedded mode if asked in GET paramters
 */
function checkEmbbededMode() {
	if (Embedded.getQueryParam("mode")=="embedded") {
	  document.getElementById('map').style.top = "0";
	  document.getElementById('cartovrac_link').style.display = "block";
	  document.getElementById('menuToggle').style.display = 'none';
	  document.getElementById('content').style.display = 'none';
	}
}

/**
 * Decide where the shop should be displayed, either on the spot or in the
 * center of a way
 */
function getPosition(shop, isANode) {
	var reference = isANode ? shop['center'] : shop;
	return {lat: reference['lat'], lon: reference['lon']};
}

/**
 * Check if the shop json information is a node or a way
 */
function isElementANode(shop) {
	return (shop['type'] == 'way' && shop['center']);
}

/**
 * Load the map and display the shops
 **/
function populate() {

	var cluster = createMap();

	for (var shopIndex in shops) {
		var shop = shops[shopIndex]
		var tags = shop['tags'];
		var isANode = isElementANode(shop);
		var position = getPosition(shop, isANode);
    	var type = tags['shop'] || tags['amenity'] || tags['craft'];
		var category = categories[type];
		var suffix = null;

		// Check shop validity
		if (!type || !category || !tags['name']) {
			console.log('Problem when displaying ' + (isANode ? 'node ' : 'way ') + 
				shop['id'] + ' of type ' + type + ' ; name ' + tags['name']);
			continue;
		}

		// TODO very specific
		if (tags['name'] == "Green Shopper") {
			suffix = 'en ligne';
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
			category.prefix,
			suffix,
			isANode
		);

		// Check that popup has been correctly created
		if (popup) {
			addMarkerToMap(category, cluster, popup, position);
		}
	}
}

/**
 * Create a map based on default configuration and GET parameters
 */
function createMap() {
	// Get bounds from get parameters and validate them before using it.
	var mapConfig = {
		centerLat: Embedded.getQueryParam("lat") || config.defaultCenterLat,
		centerLng: Embedded.getQueryParam("lng") || config.defaultCenterLng,
		zoom: Embedded.getQueryParam("zoom") || config.defaultZoom,
		minZoom: config.minZoom,
		maxZoom: config.maxZoom,
		boundN: Math.min(Embedded.getQueryParam("boundN") || 90, config.maxBoundN),
		boundS: Math.max(Embedded.getQueryParam("boundS") || 0, config.minBoundS),
		boundW: Math.max(Embedded.getQueryParam("boundW") || -180, config.minBoundW),
		boundE: Math.min(Embedded.getQueryParam("boundE") || 180, config.maxBoundE)
	}

	// Validate bounds
	if (mapConfig.boundN < mapConfig.boundS || mapConfig.boundE < mapConfig.boundW) {
		console.error("error - wrong coordinates parameters");
		mapConfig.boundN = config.maxBoundN;
		mapConfig.boundS = config.minBoundS;
		mapConfig.boundW = config.minBoundW;
		mapConfig.boundE = config.maxBoundE;
	}

	return newMap(mapConfig, config, categories);
}