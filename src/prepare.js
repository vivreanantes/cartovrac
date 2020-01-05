const fs = require('fs');

simplifyDataStructure('cache_bulk_data');

function simplifyDataStructure(fileName) {
	fs.readFile(fileName+'.json', 'utf8', (err, jsonString) => {
	    if (err) {
	        console.log("File read failed:", err)
	        return
	    }
	    //console.log('File data:', jsonString)

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

	  var newJsonString = JSON.stringify(simplifiedJson); 

	    fs.writeFile('dist/'+fileName+'_simplified.json', newJsonString, err => {
	    if (err) {
	        console.log('Error writing file', err)
	    } else {
	        console.log('Successfully wrote file')
	    }
	})
	})
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