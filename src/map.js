var $ = require('jquery');
var L = require('leaflet');
var Embedded = require('./embedded.js');
var ShopMarker = require('./shopmarker.js');

import 'leaflet.markercluster';
import 'leaflet.featuregroup.subgroup';
import * as shopmarker from './shopmarker.js';

// Load the styles
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

// Bounds for display
var minBoundS = 40;
var minBoundW = -7;
var maxBoundN = 53;
var maxBoundE = 11;

// Get bounds from get parameters and validate them before using it.
var boundS = Math.max(Embedded.getQueryParam("boundS") || 0, minBoundS);
var boundW = Math.max(Embedded.getQueryParam("boundW") || -180, minBoundW);
var boundN = Math.min(Embedded.getQueryParam("boundN") || 90, maxBoundN);
var boundE = Math.min(Embedded.getQueryParam("boundE") || 180, maxBoundE);
if (boundN < boundS || boundE < boundW) {
	console.error("error - wrong coordinates parameters");
	boundN = maxBoundN;
	boundS = minBoundS;
	boundW = minBoundW;
	boundE = maxBoundE;
}

var bounds = new L.LatLngBounds(new L.LatLng(boundN, boundE), new L.LatLng(boundS, boundW));

// Map definition
var maxZoom = 17;
var minZoom = 5;
var defaultZoom = 6;
var zoom = Embedded.getQueryParam("zoom") || 6;
var centerLat = Embedded.getQueryParam("lat") || 47;
var centerLng = Embedded.getQueryParam("lng") || 2;
var mapCenter = new L.latLng(centerLat, centerLng);
var map = L.map('map', {
		fullscreenControl: true,
		center: mapCenter,
		zoom: zoom,
		minZoom: minZoom,
		maxZoom: maxZoom,
		maxBounds: bounds
	});

// Add branding and license links
L.tileLayer(
	'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', 
	{
		attribution: 'Map data &copy; '+
			'<a href="http://openstreetmap.org">OpenStreetMap</a> contributors, '+
			'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, '+
			'Imagery © <a href="http://mapbox.com">Mapbox</a>',
		maxZoom: maxZoom,
		id: 'mapbox.streets',
		accessToken: 'pk.eyJ1IjoidnJhY2FuYW50ZXMiLCJhIjoiY2prZ21vaWMxMDVxZTNwcm5wZ29vbmY2aCJ9.cBMOReBbeqSWQA3nWsGnuw'
	}
).addTo(map);

/**
 * Load data from cache first
 */
var shopsJson, jtbPartners;
$(document).ready(function(){
	ShopMarker.initSubGroups(map);
	
	$.when(
	    $.getJSON('cache_data.json', function(response) {
	        shopsJson = response.elements
	    }),
	    $.getJSON('jtb_partners.json', function(response) {
	        jtbPartners = response.elements
	    })
	).then(function() {
	    addListOfShops();
	});
});

/**
 * Take a list of shops as JSON and display them in a cluster on the map
 **/
function addListOfShops() {	
	for (var shopIndex in shopsJson) {
		var shop = shopsJson[shopIndex]
		var shopTags = shop['tags'];
		var lat, lon;
		var isANode = true;

		// Get coordinates
		if (shop['type'] == "way") {
			isANode = false;

			// As ways are a list of nodes, we have to get the center node
			var shopCenter = shop['center'];
			if (shopCenter) {
				lat = shopCenter['lat'];
				lon = shopCenter['lon'];
			}	
		} else {
			lat = shop['lat'];
			lon = shop['lon'];
		}

		// check minimum information to display a marker
		if (!lat || !lon) {
			console.log("No coordinates found for shop: id="+shop['id']+" ; name="+name);
			continue;
		}

		// Get the type of shop/amenity to manage
		var type = ShopMarker.getType(shopTags['name'], shopTags['shop'], shopTags['amenity'], shopTags['craft']);
		if (!type) {
			console.log("No type found for shop: id="+shop['id']+" ; name="+name);
			continue;
		}

		// Create popup content depending on element's tags
		var popup = getPopupContent(
				shop['id'],
				shopTags['name'],
				shopTags['organic'],
				shopTags['bulk_purchase'],
				shopTags['addr:housenumber'],
				shopTags['addr:street'],
				shopTags['addr:postcode'],
				shopTags['addr:city'],
				shopTags['opening_hours'],
				shopTags['website'],
				shopTags['contact:website'],
				shopTags['facebook'],
				shopTags['contact:facebook'],
				type,
				isANode
		);

		// Check that popup has been correctly created
		if (!popup) {
			console.log("No popup found for shop : id="+shop['id']+" ; name="+name);
			continue;
		}
		
		ShopMarker.addMarkerToMap(type, popup, lat, lon);
	}
}

/**
 * Format shop information into an html style string for the popup
 **/
function getPopupContent(
		elementId,
		name,
		organic,
		bulk_purchase,
		housenumber,
		street,
		postcode,
		city,
		opening_hours,
		website,
		contactWebsite,
		facebookUrl,
		contactFacebookUrl,
		type,
		isANode
){

	// Check that name exists
	if (!name) {
		return null;
	}
	var popup = '<b>'+name+'</b><br />';

	// Set the shop type
	var shopTitle = ShopMarker.getShopTitle(type, organic, bulk_purchase);
	if (shopTitle) {
		popup += '<i>' + shopTitle ;

		if (name == "Green Shopper") {
			popup += ' en ligne';	
		}

		popup += '</i><br />';
	}
		
	popup += ShopMarker.getHtmlFormattedAddress(housenumber, street, postcode, city);	
	popup += ShopMarker.getHtmlFormattedHours(opening_hours);
	popup += ShopMarker.getHtmlFormattedWebsite(website, contactWebsite, facebookUrl, contactFacebookUrl);
	popup += getHtmlFormattedPartnerships(elementId);
	popup += getHtmlFormattedContribution(elementId, isANode);
	return popup;
}

/**
 * @param elementId the OpenStreetMap id of the element
 * @param isANode true if the element is a node, false if it's a way
 * @return an HTML formatted that adds a link for contributions
 */
function getHtmlFormattedContribution(elementId, isANode) {
	var baseUrl; 
	
	if (isANode) {
		baseUrl = "https://openstreetmap.org/node/";
	} else { 
		baseUrl = "https://openstreetmap.org/way/";
	}

	var contributionHtml =  '<hr style="padding-bottom: ;padding-bottom: 0px;" size="1">';
	contributionHtml += '<a href="'+baseUrl+elementId+'" target="_blank" title="Modifier les informations sur OpenStreetMap. Elles seront mises à jour sur CartoVrac dans les 24h suivant la modification.">Modifier ces informations</a>';
	return contributionHtml;
}

/**
 * @return an HTML formatted list of partners
 */
function getHtmlFormattedPartnerships(elementId) {
	var partners = "";

	if (isJaimeTesBocauxPartner(elementId)){
	    partners += '<hr style="padding-bottom: ;padding-bottom: 0px;" size="1">';
	    partners += '<div style="display: flex;"><img style="height: 50px;" src="img/jtb.png"/><div style="margin: auto; font-weight: bold;">Partenaire <br />J\'aime tes bocaux</div></div>';
    }

	return partners;
}

/**
 * Check if the shop is a partner of the organization "J'aime tes bocaux"
 * @param elementId the id of the element
 * @return true if it's a "J'aime tes bocaux" partner, false otherwise
 */
function isJaimeTesBocauxPartner(elementId) {

    for (var groupIndex in jtbPartners) {
    	var group = jtbPartners[groupIndex];
		for (var idIndex in group.ids) {
			var id = group.ids[idIndex];
			if (id == elementId) {
	       		return true;
	       	}
		}
	}

 	return false;
}
