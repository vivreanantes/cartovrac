// Load the map library 
import 'leaflet.markercluster';

// Load the styles
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

/**
 * Initialize map and return instance of the cluster added to the map.
 */
export function newMap(mapConfig, config, categories) {
	// Create the map
	var map = L.map('map', {
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

	brandingLayer(config).addTo(map);
	
	var cluster = new L.MarkerClusterGroup({maxClusterRadius: 50});
    var layers = L.control.layers(null, null, {collapsed: true});
    cluster.addTo(map);

	return cluster;
}

/** 
 * Create branding and license links
 */
function brandingLayer(config) {
	var layer = L.tileLayer(
		config.mapUrl,
		{
			attribution: config.mapAttribution,
			maxZoom: config.maxZoom,
			id: 'mapbox.streets',
			accessToken: config.mapToken
		}
	)
	return layer;
}

/**
 * Add a marker on the map with the style matching the type
 * @param category the category object of the shop
 * @param cluster the cluster of markers
 * @param popup the text HTML formatted to display in the popup
 * @param position the position (as in lat, lon) of the shop
 **/
export function addMarkerToMap(category, cluster, popup, position) {
    // Add marker and popup to the cluser
    var marker = L.marker(new L.latLng(position.lat, position.lon), {icon: category.icon})
        .bindPopup(popup)
        .addTo(cluster);
}
