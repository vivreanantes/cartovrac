import './menu.js';

var Embedded = require('./embedded.js');

import 'typeface-roboto';

import style from "../assets/stylesheets/styles.css";
import styleLayerGroup from "../assets/stylesheets/leaflet.groupedlayercontrol.css";

import {createMapAndPopulate} from './osm_eco_extractor.js';
import * as config from './config.js';
import * as LayerGroup from './leaflet.groupedlayercontrol.js';

$(document).ready(function(){
	checkEmbbededMode();
	createMapAndPopulate("map", ["fr"], getMapConfig());
});


/**
 * Activated embedded mode if asked in GET paramters
 */
function checkEmbbededMode() {
	if (Embedded.getQueryParam("mode")=="embedded") {
	  document.getElementById('map').style.top = "0";
	  document.getElementById('contribute_form').style.top = "20px";
	  document.getElementById('cartovrac_link').style.display = "block";
	  document.getElementById('menuToggle').style.display = 'none';
	  document.getElementById('content').style.display = 'none';
	}
}

/**
 * Create a map configuration based on default configuration and GET parameters
 */
function getMapConfig() {
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
		boundE: Math.min(Embedded.getQueryParam("boundE") || 180, config.maxBoundE),
		attribution: config.attribution,
		mapToken: config.mapToken,
		mapUrl: config.mapUrl,
		osmType: Embedded.getQueryParam("osmType"),
		osmId: Embedded.getQueryParam("osmId")
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