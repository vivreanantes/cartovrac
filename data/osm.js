const fetch = require('node-fetch');

module.exports = function() {
  return fetch('https://www.overpass-api.de/api/interpreter?data=[out:json][timeout:500][maxsize:20737418];(area[%22ISO3166-1%22~%22FR|MC%22];)-%3E.fr;(node[%22bulk_purchase%22~%22yes|only%22](area.fr);way[%22bulk_purchase%22~%22yes|only%22](area.fr););out%20center;')
    .then((response) => (response.text()))
    .then((jsonString) => ({code: simplifyDataStructure(jsonString)}));
}

function simplifyDataStructure(jsonString) {
  var jsonContent = JSON.parse(jsonString);
	var jsonContentElements = jsonContent.elements;
	var simplifiedJson = [];
	for (var i=0; i<jsonContentElements.length; i++) {
		var simplifiedElement = {};
		var element = jsonContentElements[i];
		var elementTags = jsonContentElements[i].tags;
	 	var type = element.type;
  	// Consider the Way coordinates as if it was a node
  	if (type == "way") {
  	  var center = jsonContentElements[i].center;
		  simplifiedElement.lat = center.lat;
		  simplifiedElement.lon = center.lon;
		} else {
		  simplifiedElement.lat = element.lat;
		  simplifiedElement.lon = element.lon;
		}

		// Set the type in the id for potential links to OSM
		simplifiedElement.id = type + "/" + element.id;

		// Simplify address field
		var address = getHtmlFormattedAddress(
		  elementTags['addr:housenumber'],
			elementTags['addr:street'],
			elementTags['addr:postcode'],
			elementTags['addr:city']
		);
		addIfNotNull(simplifiedElement, 'addr', address)

		// Simplify website link
		var url = getWebsiteUrl(
			elementTags['website'],
			elementTags['contact:website'],
			elementTags['facebook'],
			elementTags['contact:facebook']
		);
		addIfNotNull(simplifiedElement, 'url', url)

		// Add shop information
		addIfNotNull(simplifiedElement, 'shop', elementTags['shop'])
		addIfNotNull(simplifiedElement, 'amenity', elementTags['amenity'])
		addIfNotNull(simplifiedElement, 'craft', elementTags['craft'])
		addIfNotNull(simplifiedElement, 'bio', elementTags['organic'])
		addIfNotNull(simplifiedElement, 'bulk', elementTags['bulk_purchase'])
		addIfNotNull(simplifiedElement, 'operator_type', elementTags['operator:type'])
		addIfNotNull(simplifiedElement, 'name', elementTags['name'])
		addIfNotNull(simplifiedElement, 'drive_through', elementTags['drive_through'])

		// Add partners information
		addIfNotNull(simplifiedElement, 'source:bulk_purchase', elementTags['source:bulk_purchase'])

		// Add simplified element to new JSON
		simplifiedJson.push(simplifiedElement);
  }
	return JSON.stringify(simplifiedJson);
}

function addIfNotNull(element, label, value) {
	if (value != null && value != "") {
		element[label] = value;
	}
}

/**
 * @return an HTML formatted website link
 */
function getWebsiteUrl(website, contact_website, facebook, contact_facebook) {
  var url;

  if (website) {
    url = website;
  } else if (contact_website) {
    url = contact_website;
  } else if (facebook) {
    url = facebook;
  } else if (contact_facebook) {
    url = contact_facebook;
  } else {
    return "";
  }
  return url;
}

/**
 * @return an HTML formatted address
 */
function getHtmlFormattedAddress(housenumber, street, postcode, city) {
  var address = "";
  if (street && housenumber) {
    address += housenumber+' '+street+'<br />';
  } else if (street) {
    address += street+'<br />';
  }
  if (city && postcode) {
    address += postcode+' '+city+'<br />';
  } else if (city) {
    address += city+'<br />';
  }
  return address;
}
