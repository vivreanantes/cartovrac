import './map.js';
import './menu.js';

var Embedded = require('./embedded.js');

import 'typeface-roboto';

import style from "../assets/stylesheets/styles.css";


import {newMap, addMarkerToMap} from './map.js';
import {getPopupContent} from './popup.js';
import {categories} from './data.js';
import * as config from './config.js';

/**
 * Load data from cache first
 */
var cluster = createMap();
var shopsJson, jtbPartners;

checkEmbbededMode();

$(document).ready(function(){
	$.when(
	    $.getJSON('cache_data.json', function(response) {
	        shopsJson = response.elements
	    }),
	    $.getJSON('jtb_partners.json', function(response) {
	        jtbPartners = response.elements
	    })
	).then(function() {
		populate();
	});
});



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

/**
 * Display the shops
 **/
function populate() {
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
			console.log('Problem when displaying ' + (isAWay ? 'node ' : 'way ') + 
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
			tags['contact:website'],
			tags['facebook'],
			tags['contact:facebook'],
			category.prefix,
			suffix,
			isAWay,
			jtbPartners
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