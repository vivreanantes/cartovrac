import {newMap, addMarkerToMap} from './map.js';
import {categories, partners} from './static.js';
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
 * Create a map in given div id and export var itinerant = require("../data/itinerant.json");
export var bulk = require("../data/bulk_simplified.json");
populate it
 * @param divId the id of the div that will include the map
 * @param mapConfig the configuration (zoom, default location ...) to apply to the map
 */
export function createMapAndPopulate(divId, mapConfig) {
	map = newMap(divId, mapConfig, categories);
	prepareCaterogiesSubgroupsAndIcons(map);

  import(/* webpackChunkName: "data" */ './data.js').then(({bulk, itinerant}) => {
    populateBulkShops(bulk);
    populateItinerantShops(itinerant.elements);
  })

	if (mapConfig.osmId != null && mapConfig.osmType != null) {
		zoomOnBulkMarker(mapConfig.osmType+'/'+mapConfig.osmId);
	}
}

/**
 * Zoom on given marker, open container cluster and show marker's popup
 */
function zoomOnBulkMarker(id) {
	var markerToZoomOn = getMarker(bulkMarkerArray, id)

	if (markerToZoomOn) {
		map.setView(markerToZoomOn.getLatLng(), 16);
		cluster.zoomToShowLayer(markerToZoomOn, function () {
			markerToZoomOn.openPopup();
		});
	} else {
		console.log("Couldn't find given marker ("+id+"). Are you sure it's a correct bulk purchase shop?");
		console.log(bulkMarkerArray);
	}
}

function getMarker(markerArray, id) {
	var markerToZoomOn = null;
	for (var i in bulkMarkerArray) {
  	var marker = bulkMarkerArray[i];
  	if (marker.options.id == id) {
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

		var key = '<img src="'+category.iconUrl+'" height="30px" width="19px" style="margin-left: 2px; margin-right: 4px; margin-top: 8px; margin-bottom: -7px;"/>'+category.prefix;
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
		  popup += '<a href="' + url + '" target="_blank" rel="noopener">Site web avec les horaires de présence</a><br />';

			// Check that popup has been correctly created
			addMarkerToMap(category, popup, latitude, longitude, null);
		}
	}
}

/**
 * Display the bulk shops
 **/
function populateBulkShops(json) {
	for (var shopIndex in json) {
		var element = json[shopIndex];
    var type = getType(element);
    var category = categories[type];

		// Create popup content depending on element's tags
		var popup = getBasePopupFromElement(element, type, category);
		if (!popup) {
			continue;
		}

		// Add partner banner
		var partner = partners[element["source:bulk_purchase"]];
		if (partner) {
			popup += '<hr style="padding-bottom: ;padding-bottom: 0px;" size="1"><a href="'+partner.link+'" target="_blank" rel="noopener"><div style="display: flex;"><img style="height: 50px; margin-right: 5px;" src="'+partner.icon+'"/><div style="margin: auto; font-weight: bold;">Partenaire <br />'+partner.name+'</div></div></a>';
		}

		// Add popup on a marker
		var marker = addMarkerToMap(category, popup, element.lat, element.lon, element.type+'/'+element.id);
		bulkMarkerArray.push(marker);
	}
}

/**
 * Generate HTML popup with element content if valid, otherwise return a null object.
 **/
function getBasePopupFromElement(element, type, category) {
	// Check shop validity
	if (!type || !category || !element.name) {
		return null;
	}

	return getPopupContent(
		element.id,
		element.name,
		element.bio,
		element.bulk,
		element.addr,
		element.opening_hours,
		element.url,
		element.drive_through,
		category
	);
}

function getType(element) {
	var type = element.shop || element.amenity || element.craft;

	// Special type for bulk purchase only
	if (type == "convenience" && element.bulk == "only") {
		type = "only_bulk_convenience";
	} else if (type == "supermarket" && element.bio == "only") {
		type = "organic_supermarket"
	} else if (type == "supermarket" && element.operator_type == "cooperative") {
		type = "cooperative_supermarket"
	}
	return type;
}
