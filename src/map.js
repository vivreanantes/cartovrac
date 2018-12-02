// Load the map library 
import 'leaflet.markercluster';
import 'leaflet.featuregroup.subgroup';

// Load the styles
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

/**
 * Initialize map and return instance of the cluster added to the map.
 * @param divId the id of the div into which the map will be injected
 */
export function newMap(divId, mapConfig, categories) {
	// Create the map
	var map = L.map(divId, {
		fullscreenControl: true,
		center: new L.latLng(mapConfig.centerLat, mapConfig.centerLng),
		zoom: mapConfig.zoom,
		minZoom: mapConfig.minZoom,
		maxZoom: mapConfig.maxZoom,
		maxBounds: new L.LatLngBounds(
			new L.LatLng(mapConfig.boundN, mapConfig.boundE),
			new L.LatLng(mapConfig.boundS, mapConfig.boundW)
		)
	});

	brandingLayer(mapConfig).addTo(map);

	return map;
}

/** 
 * Create branding and license links
 */
function brandingLayer(mapConfig) {
	var layer = L.tileLayer(
		mapConfig.mapUrl,
		{
			attribution: mapConfig.attribution,
			maxZoom: mapConfig.maxZoom,
			id: 'mapbox.streets',
			accessToken: mapConfig.mapToken
		}
	)
	return layer;
}

/**
 * Add a marker on the map with the style matching the type
 * @param category the category object of the shop
 * @param popup the text HTML formatted to display in the popup
 * @param position the position (as in lat, lon) of the shop
 **/
export function addMarkerToMap(category, popup, position) {
    // Add marker and popup to the cluser
    var marker = L.marker(new L.latLng(position.lat, position.lon), {icon: category.icon})
        .bindPopup(popup)
        .addTo(category.subgroup);
}
