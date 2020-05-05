/**
 * Format shop information into an html style string for the popup
 **/
export function getPopupContent(
	elementId,
	name,
	organic,
	bulk_purchase,
	address,
	opening_hours,
	url,
	drive,
	category
){
  // Check that name exists
  if (!name) {
      return null;
  }

	var popup = '<b>'+name+'</b><br />';
	// Set the shop type
	popup += getHtmlFormattedShopTitle(category, organic, bulk_purchase, drive);
  if (address) popup += address;
  popup += getHtmlFormattedHours(opening_hours);
  popup += getHtmlFormattedWebsite(url);
  popup += getHtmlFormattedContribution(elementId);
	return popup;
}

/**
 * Get a title describing the shop type
 */
export function getHtmlFormattedShopTitle(category, organicTag, bulk_purchaseTag, driveTag) {
  // Start text with italic style and add prefix depending on type
  var title = category.prefix;

  // Add different suffix depending if it's a shop selling some bulk products or mainly bulk products
  if (category.addBulkSuffix) {
    if (bulk_purchaseTag == "only") {
        title += ' utilisant uniquement des contenants réutilisables';
    } else if (bulk_purchaseTag == "yes") {
        title += ' acceptant vos contenants';
    }
	}

  // Add annotation if products are organics
  if (category.addOrganicSuffix) {
    if (organicTag == "yes") {
    	title += ', avec des produits bio.';
    } else if (organicTag == "only") {
        title += ', 100% bio.';
    }
	}

  // Add drive annotation
  if (driveTag == "yes") {
      title += '<br />Propose un service en ligne avec retrait en magasin.<br />';
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
function getHtmlFormattedWebsite(url) {
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
 * @param elementId the OpenStreetMap type and id of the element (example "node/12989482")
 * @return an HTML formatted that adds a link for contributions
 */
function getHtmlFormattedContribution(elementId) {
  if (!elementId) {
    return "";
  }

  var url = "https://openstreetmap.org/"+elementId;
  var contributionHtml =  '<hr style="padding-bottom: ;padding-bottom: 0px;" size="1">';
  contributionHtml += '<a href="'+url+'" target="_blank" title="Modifier' +
  ' les informations sur OpenStreetMap. Elles seront mises à jour sur CartoVrac dans ' +
  'les 24h suivant la modification.">Modifier ces informations</a>';
  return contributionHtml;
}
