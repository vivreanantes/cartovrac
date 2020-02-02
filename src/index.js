import './menu.js';

import 'typeface-roboto';

import style from "../assets/stylesheets/styles.css";
import styleLayerGroup from "../assets/stylesheets/leaflet.groupedlayercontrol.css";

import {createMapAndPopulate} from './populate.js';
import * as config from './config.js';
import * as LayerGroup from './leaflet.groupedlayercontrol.js';

// Get query parameters
var query = require('url').parse(window.location.search, true).query;

$(document).ready(function(){
	checkEmbbededMode();
	createMapAndPopulate("map", getMapConfig());

	// Fix waiting for library update
	$(".leaflet-control-geocoder-icon").attr("aria-label", "Zoomer sur ma position");
});


/**
 * Activated embedded mode if asked in GET paramters
 */
function checkEmbbededMode() {
	if (query["mode"]=="embedded") {
	  $('body').addClass("embedded");
	}
}

/**
 * Create a map configuration based on default configuration and GET parameters
 */
function getMapConfig() {
	// Get bounds from get parameters and validate them before using it.
	var mapConfig = {
		centerLat: query["lat"] || config.defaultCenterLat,
		centerLng: query["lng"] || config.defaultCenterLng,
		zoom: query["zoom"] || config.defaultZoom,
		minZoom: config.minZoom,
		maxZoom: config.maxZoom,
		boundN: Math.min(query["boundN"] || 90, config.maxBoundN),
		boundS: Math.max(query["boundS"] || -90, config.minBoundS),
		boundW: Math.max(query["boundW"] || -180, config.minBoundW),
		boundE: Math.min(query["boundE"] || 180, config.maxBoundE),
		attribution: config.attribution,
		mapToken: config.mapToken,
		mapUrl: config.mapUrl,
		osmType: query["osmType"],
		osmId: query["osmId"]
	}

	// Validate bounds
	if (mapConfig.boundN < mapConfig.boundS || mapConfig.boundE < mapConfig.boundW) {
		console.error("error - wrong coordinates parameters");
		mapConfig.boundN = config.maxBoundN;
		mapConfig.boundS = config.minBoundS;
		mapConfig.boundW = config.minBoundW;
		mapConfig.boundE = config.maxBoundE;
	}

	return mapConfig;
}
