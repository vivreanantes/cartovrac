// Load the map library
import 'leaflet.markercluster';
import 'leaflet.featuregroup.subgroup';
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.js';
import 'leaflet-control-geocoder';
import 'mapbox-gl-leaflet';

// Load the styles
import 'mapbox-gl/dist/mapbox-gl.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';


var osmMarker = L.Marker.extend({
   options: {
      osmType: 'node',
      osmId: -1
   }
});

/**
 * Initialize map and return instance of the cluster added to the map.
 * @param divId the id of the div into which the map will be injected
 */
export function newMap(divId, mapConfig, categories) {
	// Create the map
	var map = L.map(divId, {
		attributionControl: false,
		fullscreenControl: true,
		tap: false, // ref https://github.com/Leaflet/Leaflet/issues/7255
		center: new L.latLng(mapConfig.centerLat, mapConfig.centerLng),
		zoom: mapConfig.zoom,
		minZoom: mapConfig.minZoom,
		maxZoom: mapConfig.maxZoom,
		maxBounds: new L.LatLngBounds(
			new L.LatLng(mapConfig.boundN, mapConfig.boundE),
			new L.LatLng(mapConfig.boundS, mapConfig.boundW)
		)
	});

	// Configure vector tiles
	L.mapboxGL({accessToken: mapConfig.mapToken, style: 'mapbox://styles/mapbox/streets-v11?optimize=true', attributionControl: false}).addTo(map);

	// Add control
	showUserLocationButton(map);

	// Add search bar
	var geocoder = L.Control.Geocoder.mapbox({apiKey: mapConfig.mapToken, geocodingQueryParams : {"country": "FR"}});
	L.Control.geocoder({
	  geocoder: geocoder,
		defaultMarkGeocode: false,
		position: "topleft",
		placeholder: "Recherche...",
		errorMessage: "Aucun résultat trouvé",
		showResultIcons: true,
		iconLabel: "Commencer une recherche"
	}).on('markgeocode', function(e) {
    map.fitBounds(e.geocode.bbox);
  }).addTo(map);

  // Add attributions
  L.control.attribution().addAttribution(mapConfig.attribution).addTo(map);
	return map;
}

/**
 * Add a marker on the map with the style matching the type
 * @param category the category object of the shop
 * @param popup the text HTML formatted to display in the popup
 * @param lat latitude of the shop
 * @param lon longiutude of the shop
 **/
export function addMarkerToMap(category, popup, lat, lon, id) {
  // Add marker and popup to the cluser
  return new osmMarker(
  	new L.latLng(lat, lon),
  	{
  		icon: category.icon,
  		id: id
		}
  ).bindPopup(popup).addTo(category.subgroup);
}

function showUserLocationButton(map) {
	L.control.locate({
		flyTo: true,
		icon: "show-location-btn",
		onLocationError: function(){
			alert("Vous devez activer la géolocalisation sur votre navigateur pour afficher votre position (généralement à gauche de la barre d'adresse).")
		},
		strings: {
			title: "Montrer ma position",
			popup: "Votre position",
			outsideMapBoundsMsg: "Votre position se trouve en dehors de la zone gérée par CartoVrac pour le moment."
		}
	}).addTo(map);
}
