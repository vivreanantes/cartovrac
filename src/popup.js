import {elements as jtbPartners} from '../jtb_partners.json';

/**
 * Format shop information into an html style string for the popup
 **/
export function getPopupContent(
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
        contact_website,
        facebook,
        contact_facebook,
		prefix,
		suffix,
        isANode
){
    // Check that name exists
    if (!name) {
        return null;
    }

	var popup = '<b>'+name+'</b><br />';
	// Set the shop type
	popup += getHtmlFormattedShopTitle(prefix, suffix, organic, bulk_purchase);
    popup += getHtmlFormattedAddress(housenumber, street, postcode, city);   
    popup += getHtmlFormattedHours(opening_hours);
    popup += getHtmlFormattedWebsite(website, contact_website, facebook, contact_facebook);
    popup += getHtmlFormattedPartnerships(elementId);
    popup += getHtmlFormattedContribution(elementId, isANode);
	return popup;
}

/**
 * Get a title describing the shop type
 */
function getHtmlFormattedShopTitle(prefix, suffix, organicTag, bulk_purchaseTag) {
    // Start text with italic style and add prefix depending on type
    var title = prefix;
    // Add annotation if products are organics
    if (organicTag == "yes" || organicTag == "only") {
        title += ' bio.';
    }
    // Add different suffix depending if it's a shop selling some bulk products or mainly bulk products
    if (bulk_purchaseTag == "only") {
        title += ' 100% vrac';
    } else if (bulk_purchaseTag == "yes"){
        title += ' avec rayon vrac';
    } else {
        title += ' acceptant vos contenants';
    }
		// Add the prefix if required
		if(suffix) {
			title += ' ' + suffix;
		}
    return '<i>' + title + '</i><br />';
}
/**
 * Transform OpenStreetMap hours into french readable hours
 **/
function getReadableHours(opening_hours){
    return opening_hours.replace("Mo", "Lundi")
        .replace("Tu", "Mardi")
        .replace("We", "Mercredi")
        .replace("Th", "Jeudi")
        .replace("Fr", "Vendredi")
        .replace("Sa", "Samedi")
        .replace("Su", "Dimanche")
        .replace("off", "fermé")
        .replace(",", " & ");
}
/**
 * @return an HTML formatted website link
 */
function getHtmlFormattedWebsite(website, contact_website, facebook, contact_facebook) {
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

    return '<a href="' + url + '" target="_blank">Site web</a><br />';
}

/**
 * @return an HTML formatted opening hours text
 */
function getHtmlFormattedHours(opening_hours) {
    var hours = "";
    if (!opening_hours) {
        return hours;
    }
    hours += '<b>Horaires</b><br />';
    var hoursSplit = opening_hours.split('; ');
    for (var hoursIndex in hoursSplit) {
        hours += getReadableHours(hoursSplit[hoursIndex]) + '<br />';
    }
    return hours;
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

/**
 * @param elementId the OpenStreetMap id of the element
 * @param isAWay true if the element is a way, false if it's a node
 * @return an HTML formatted that adds a link for contributions
 */
function getHtmlFormattedContribution(elementId, isAWay) {
    var baseUrl; 
    
    if (isAWay) {
        baseUrl = "https://openstreetmap.org/way/";
    } else { 
        baseUrl = "https://openstreetmap.org/node/";
    }

    var contributionHtml =  '<hr style="padding-bottom: ;padding-bottom: 0px;" size="1">';
    contributionHtml += '<a href="'+baseUrl+elementId+'" target="_blank" title="Modifier' +
    ' les informations sur OpenStreetMap. Elles seront mises à jour sur CartoVrac dans ' +
    'les 24h suivant la modification.">Modifier ces informations</a>';
    return contributionHtml;
}

/**
 * @return an HTML formatted list of partners
 */
function getHtmlFormattedPartnerships(elementId) {
    var partners = "";

    if (isJaimeTesBocauxPartner(elementId)){
        partners += '<hr style="padding-bottom: ;padding-bottom: 0px;" size="1">';
        partners += '<div style="display: flex;">';
        partners += '<img style="height: 50px;" src="'+require("../assets/img/jtb.png")+'"/>';
        partners += '<div style="margin: auto; font-weight: bold;">Partenaire <br />J\'aime tes bocaux</div></div>';
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