// Sub-groups
var repairSectionSubGroup;
var fabrikSubGroup;
var furnituresSubGroup;
var smallElectronicsDevicesSubGroup;
var bakeryShopSubGroup;

// List of managed shops
var ShopEnum = {
  CONVENIENCE: 1,
  SUPERMARKET: 2,
  BUTCHER: 3,
  DAIRY: 4,
  GREENGROCER: 5,
  BAKERY: 6,
  properties: {}
};

/**
 * Initialize the sub-groups to add them to the given map
 */
function initSubGroups(map) {
    // Add the cluster
    var cluster = new L.MarkerClusterGroup({maxClusterRadius: 50});
    cluster.addTo(map);

    // Create sub-groups
    repairSectionSubGroup = L.featureGroup.subGroup(cluster).addTo(map);
	bicycleSubGroup = L.featureGroup.subGroup(cluster).addTo(map);
    fabrikSubGroup = L.featureGroup.subGroup(cluster).addTo(map);
    furnituresSubGroup = L.featureGroup.subGroup(cluster).addTo(map);
    smallElectronicsDevicesSubGroup = L.featureGroup.subGroup(cluster).addTo(map);
    computersSubGroup = L.featureGroup.subGroup(cluster).addTo(map);


    // and add them to the control
    L.control.layers(null, null, { collapsed: true })
        .addOverlay(repairSectionSubGroup, 'Ateliers de co-réparation')
		.addOverlay(bicycleSubGroup, 'Vélo'+getIconForControlLayer(bicycleIconUrl))
        .addOverlay(fabrikSubGroup, 'Tissu et vêtements'+getIconForControlLayer(fabrikIconUrl))
        .addOverlay(furnituresSubGroup, 'Meubles'+getIconForControlLayer(furnituresIconUrl))
        .addOverlay(smallElectronicsDevicesSubGroup, 'Petit appareils électroniques'+getIconForControlLayer(smallElectronicsDevicesIconUrl))
        .addOverlay(computersSubGroup, 'Ordinateurs'+getIconForControlLayer(computersIconUrl))
        .addTo(map);

    ShopEnum.properties = {
        1: {icon: repairIcon, titlePrefix: 'Ateliers de co-réparation', group: repairSectionSubGroup},
        2: {icon: bicycleIcon, titlePrefix: 'Vélo', group: bicycleSubGroup},
        3: {icon: fabrikIcon, titlePrefix: 'Tissu et vêtements', group: fabrikSubGroup},
        4: {icon: furnituresIcon, titlePrefix: 'Meubles', group: furnituresSubGroup},
        5: {icon: smallElectronicsDevicesIcon, titlePrefix: 'Petit appareils électroniques', group: smallElectronicsDevicesSubGroup},
		6: {icon: computersIcon, titlePrefix: 'Ordinateurs', group: computersSubGroup},
    };
}


/**
 * Generate an HTML formatted picto for the control layer using the given url
 */
function getIconForControlLayer(url){
    return '<img src="'+url+'" height="30px" style="margin-left: 2px; margin-right: 2px;"/>';
}

/**
 * Add a marker on the map with the style matching the type
 * @param type the type of shop
 * @param popup the text HTML formatted to display in the popup
 * @param lat the latitude of the marker
 * @param lon the longitude of the marker
 **/
function addMarkerToMap(type, popup, lat, lon) {
    // Create icon depending on the shop type
    var icon = {icon: ShopEnum.properties[type].icon};

    // Add marker and popup to the cluser
    var marker = L.marker(new L.latLng(lat,lon), icon)
        .bindPopup(popup)
        .addTo(ShopEnum.properties[type].group);
}

/**
 * Get a title describing the shop type
 */
function getShopTitle(type, organicTag, collaborative_repair_shopTag) {
    // Start text with italic style and add prefix depending on type
    /*
    var title = ShopEnum.properties[type].titlePrefix;

    // Add annotation if products are organics
	if (organicTag == "yes" || organicTag == "only") {
        title += ' bio.';
    }

    // Add different suffix depending if it's a shop selling some bulk products or mainly bulk products
    if (collaborative_repair_shopTag == "only") {
        title += ' 100% vrac';
    } else if (collaborative_repair_shopTag == "yes"){
        title += ' avec rayon vrac';
    } else {
        title += ' acceptant vos contenants';
    }*/

    return title;
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
		.replace("[1]", "le 1er du mois")
		.replace("[2]", "le 2ème du mois")
		.replace("[3]", "le 3ème du mois")
		.replace("[4]", "le 4ème du mois")
        .replace(",", " & ");
}

/**
 * Get the type of shop/amenity
 */
 function getType(name, shopTag, amenityTag, craftTag) {
    var type = null;

    if (shopTag) {
        type = getTypeForShop(shopTag);
    } else if (amenityTag) {
        type = getTypeForAmenity(amenityTag);
    } else if (craftTag) {
        type = getTypeForCraft(craftTag);
    }

    if (!type) {
        console.log("Unknown shop type with name="+name+" ; shopTag="+shopTag+" ; craftTag="+craftTag+" and amenityTag="+amenityTag+ " ; type="+type);
        type = null;
    }
    
    return type;
 }

/**
 * Parse a shop tag into a ShopEnum
 * @param shopTag the tag identifying the shop
 * @return the type of building as a ShopEnum
 */
function getTypeForShop(shopTag) {
    var type = null;

    switch(shopTag) {
        case "convenience":
            type = ShopEnum.CONVENIENCE;
            break;
        case "supermarket":
            type = ShopEnum.SUPERMARKET;
            break;
        case "butcher":
            type = ShopEnum.BUTCHER;
            break;
        case "dairy":
        case "cheese":
            type = ShopEnum.DAIRY;
            break;
        case  "greengrocer":
            type = ShopEnum.GREENGROCER;
            break;
    }

    return type;
 }

/**
 * Parse an amenity tag into a ShopEnum
 * @param shopTag the tag identifying the amenity
 * @return the type of building as a ShopEnum
 */
function getTypeForAmenity(amenityTag) {
    var type = null;

    switch(amenityTag) {
        case "association":
            type = ShopEnum.FAST_FOOD;
            break;
        case "restaurant":
            type = ShopEnum.RESTAURANT;
            break;
        case "cafe":
            type = ShopEnum.CAFE;
            break;
    }

    return type;
 }

/**
 * Parse a craft tag into a ShopEnum
 * @param shopTag the tag identifying the craft
 * @return the type of building as a ShopEnum
 */
function getTypeForCraft(craftTag) {
    var type = null;

    switch(craftTag) {
        case "caterer":
            type = ShopEnum.CATERER;
            break;
    }

    return type;
 }


/**
 * @return an HTML formatted website link
 */
function getHtmlFormattedWebsite(website) {
    if (!website) {
        return "";
    }

    return '<a href="' + website + '" target="_blank">Site web</a><br />';
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