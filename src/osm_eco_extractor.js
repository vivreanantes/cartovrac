import {newMap, addMarkerToMap} from './map.js';
import {categories, cacheBulkFileName, cacheJtbFileName, itinerantFileName} from './data.js';
import {getPopupContent, getHtmlFormattedShopTitle} from './popup.js';

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

var bulkMarkerArray = [];
var map, cluster;

/**
 * Create a map in given div id and populate it
 * @param divId the id of the div that will include the map
 * @param mapConfig the configuration (zoom, default location ...) to apply to the map
 */
export function createMapAndPopulate(divId, mapConfig) {
	map = newMap(divId, mapConfig, categories);
	prepareCaterogiesSubgroupsAndIcons(map);
	populateWithBulkPurchaseShops(mapConfig.osmType, mapConfig.osmId);
	populateWithItinerantShops();
}

/**
 * Parse the list of bulk purchase shops to display them on the map
 *
 * Once all shops are displayed on the map:
 * - zoom on shop described by parameters if set.
 * - populate with J'aime tes bocaux shops making sure of no duplication
 */
function populateWithBulkPurchaseShops(osmType, osmId) {
	var bulkShopsJson;
	$.when(
	    $.getJSON(cacheBulkFileName, function(response) {
	        bulkShopsJson = response.elements
	    })
	).then(function() {
		populateBulkShops(bulkShopsJson);
		populateWithJaimeTesBocauxShops();

		if (osmType && osmId) {
			zoomOnBulkMarker(osmType, osmId);
		}
	});
}

/**
 * Parse the list of J'aime tes Bocaux partners to display them on the map
 */
function populateWithJaimeTesBocauxShops() {
	var jtbShopsJson;
	$.when(
	    $.getJSON(cacheJtbFileName, function(response) {
	        jtbShopsJson = response.elements;
	    })
		.then(function() {
			populateJtbShops(jtbShopsJson);
		})
	);
}

/**
 * Parse the list of itinerant shops to display them on the map
 */
function populateWithItinerantShops() {
	var itinerantShopsJson;
	$.when(
	    $.getJSON(itinerantFileName, function(response) {
	        itinerantShopsJson = response.elements;
	    }).then(function() {
			populateItinerantShops(itinerantShopsJson);
	  	}).fail(function( jqxhr, textStatus, error ) {
    		var err = textStatus + ", " + error;
    		console.log( "Request Failed: " + err );
		})
  	);
}

/**
 * Zoom on given marker, open container cluster and show marker's popup
 */
function zoomOnBulkMarker(osmType, osmId) {
	var markerToZoomOn = getOsmMarker(bulkMarkerArray, osmType, osmId)

	if (markerToZoomOn) {
		map.setView(markerToZoomOn.getLatLng(), 16);
		cluster.zoomToShowLayer(markerToZoomOn, function () {
			markerToZoomOn.openPopup();
		});
	} else {
		console.log("Couldn't find given marker (type="+osmType+" ; id="+osmId+"). Are you sure it's a correct bulk purchase shop?");
		console.log(bulkMarkerArray);
	}
}

function getOsmMarker(markerArray, osmType, osmId) {
	var markerToZoomOn = null;
	for (var i in bulkMarkerArray) {
	  	var marker = bulkMarkerArray[i];
	  	if (marker.options.osmType == osmType && marker.options.osmId == osmId) {
			markerToZoomOn = marker;
			break;
	  	}
	}
	return markerToZoomOn;
}

/**
 * Prepare the Leaflet icon and subgroup for each category and add them on the map
 **/
function prepareCaterogiesSubgroupsAndIcons(map) {
	// Create a cluster for all markers
	cluster = new L.MarkerClusterGroup({maxClusterRadius: 50}).addTo(map);

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
 * Display the itinerant shops
 **/
function populateItinerantShops(itinerantShopsJson) {
	for (var shopIndex in itinerantShopsJson) {
		var itinerantElement = itinerantShopsJson[shopIndex]
    	var category = categories['itinerant'];
    	var name = itinerantElement['name'];
    	var url = itinerantElement['website'];
    	var organic = itinerantElement['organic'];
    	var bulk_purchase = itinerantElement['bulk_purchase'];

		for (var placeIndex in itinerantElement['places']) {
			var placeElement = itinerantElement['places'][placeIndex];
			var latitude = placeElement['lat'];
			var longitude = placeElement['lon'];
			var place_name = placeElement['place_name'];

			// Check that element is valid
			if (!name || !longitude || !latitude) {
				console.log("Place with missing name or coordinates")
				continue;
			}

			var popup = '<b>'+name+'</b><br />';
			popup += getHtmlFormattedShopTitle(category, organic, bulk_purchase);
			popup += '<hr style="padding-bottom: ;padding-bottom: 0px;" size="1">';
			popup += place_name+'<br />';
		    popup += '<a href="' + url + '" target="_blank">Site web avec les horaires de présence</a><br />';

		    if (name == "Vrac'n Roule'") {
		    	popup += JTB_HTML_BANNER;
			}

			// Check that popup has been correctly created
			var position = {lat: latitude, lon: longitude};
			addMarkerToMap(category, popup, position, null, null);
		}
	}
}

var JTB_HTML_BANNER = '<hr style="padding-bottom: ;padding-bottom: 0px;" size="1"><div style="display: flex;"><img style="height: 50px;" src="'+require("../assets/img/jtb.png")+'"/><div style="margin: auto; font-weight: bold;">Partenaire <br />J\'aime tes bocaux</div></div>';

/**
 * Display the bulk shops
 **/
export function populateJtbShops(osmJson) {
	for (var shopIndex in osmJson) {
		var osmElement = osmJson[shopIndex]
		var osmElementTags = osmElement['tags'];
		var isAWay = isElementAWay(osmElement);
    	var type = getType(osmElementTags);
    	var category = getCategory(type);

		// Create popup content depending on element's tags
		var popup = getBasePopupFromOsmElement(osmElement, osmElementTags, type, category, isAWay);
		if (!popup) {
			continue;
		}

		// Add partner banner
		popup += JTB_HTML_BANNER;

		// If the partner is a bulk purchase shop, check that it's not already on map and replace it
		var relatedBulkMarker = getOsmMarker(bulkMarkerArray, osmElement['type'], osmElement['id']);
		if (relatedBulkMarker) {
			category.subgroup.removeLayer(relatedBulkMarker);
		}

		// Check that popup has been correctly created
		var position = getOsmPosition(osmElement, isAWay);
		var marker = addMarkerToMap(category, popup, position, osmElement['type'], osmElement['id']);
		bulkMarkerArray.push(marker);
	}
}

/**
 * Display the bulk shops
 **/
function populateBulkShops(osmJson) {
	for (var shopIndex in osmJson) {
		var osmElement = osmJson[shopIndex];
		var osmElementTags = osmElement['tags'];
		var isAWay = isElementAWay(osmElement);
    	var type = getType(osmElementTags);
    	var category = getCategory(type);

		// Create popup content depending on element's tags
		var popup = getBasePopupFromOsmElement(osmElement, osmElementTags, type, category, isAWay);

		// Check that popup has been correctly created
		if (popup) {
			var position = getOsmPosition(osmElement, isAWay);
			var marker = addMarkerToMap(category, popup, position, osmElement['type'], osmElement['id']);
			bulkMarkerArray.push(marker);
		}
	}
}

/**
 * Generate HTML popup with OSM element content if valid, otherwise return a null object.
 **/
function getBasePopupFromOsmElement(osmElement, osmElementTags, type, category, isAWay) {
	// Check shop validity
	if (!type || !category || !osmElementTags['name']) {
		console.log('Problem when displaying https://osm.org/' + (isAWay ? 'way/' : 'node/') + 
			osmElement['id'] + ' of type ' + type + ' ; name ' + osmElementTags['name']);
		return null;
	}

	return getPopupContent(
		osmElement['id'],
		osmElementTags['name'],
		osmElementTags['organic'],
		osmElementTags['bulk_purchase'],
		osmElementTags['addr:housenumber'],
		osmElementTags['addr:street'],
		osmElementTags['addr:postcode'],
		osmElementTags['addr:city'],
		osmElementTags['opening_hours'],
		osmElementTags['website'],
		osmElementTags['contact:website'],
		osmElementTags['facebook'],
		osmElementTags['contact:facebook'],
		category,
		isAWay
	);
}

function getType(osmElementTags) {
	var type = osmElementTags['shop'] || osmElementTags['amenity'] || osmElementTags['craft'];

	// Special type for bulk purchase only
	if (type == "convenience" && osmElementTags['bulk_purchase'] == "only") {
		type = "only_bulk_convenience";
	} else if (type == "supermarket" && osmElementTags['organic'] == "only") {
		type = "organic_supermarket"
	}

	return type;
}

function getCategory(type) {
	return categories[type];
}

/**
 * Decide where the shop should be displayed, either on the spot or in the
 * center of a way
 */
function getOsmPosition(shop, isAWay) {
	var reference = isAWay ? shop['center'] : shop;
	return {lat: reference['lat'], lon: reference['lon']};
}

/**
 * Check if the shop json information is a node or a way
 */
function isElementAWay(shop) {
	return (shop['type'] == 'way' && shop['center']);
}
