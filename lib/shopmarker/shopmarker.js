// Sub-groups
var repairSectionSubGroup;
var bicycleSubGroup;
var cameraSubGroup;
var computerSubGroup;
var fabrikSubGroup;
var furnitureSubGroup;
var smallElectronicsDevicesSubGroup;

// List of managed shops
var WorkshopEnum = {
  REPAIR: 1,
  BICYCLE: 2,
  CAMERA: 3,
  COMPUTERS: 4,
  FABRIK: 5,
  FURNITURE: 6,
  SMALLELECTRONICSDEVICES: 7,
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
	cameraSubGroup = L.featureGroup.subGroup(cluster).addTo(map);
    computerSubGroup = L.featureGroup.subGroup(cluster).addTo(map);
    fabrikSubGroup = L.featureGroup.subGroup(cluster).addTo(map);
    furnitureSubGroup = L.featureGroup.subGroup(cluster).addTo(map);
    smallElectronicsDevicesSubGroup = L.featureGroup.subGroup(cluster).addTo(map);


    // and add them to the control
    L.control.layers(null, null, { collapsed: true })
        .addOverlay(repairSectionSubGroup, 'Ateliers de co-réparation'+getIconForControlLayer(repairIconUrl))
		.addOverlay(bicycleSubGroup, 'uniquement Vélo'+getIconForControlLayer(bicycleIconUrl))
		.addOverlay(cameraSubGroup, 'uniquement Appareils photo'+getIconForControlLayer(cameraIconUrl))
        .addOverlay(computerSubGroup, 'uniquement Ordinateurs'+getIconForControlLayer(computersIconUrl))
        .addOverlay(fabrikSubGroup, 'uniquement Tissu et vêtements'+getIconForControlLayer(fabrikIconUrl))
        .addOverlay(furnitureSubGroup, 'uniquement Meubles'+getIconForControlLayer(furnituresIconUrl))
        .addOverlay(smallElectronicsDevicesSubGroup, 'uniquement Petit appareils électroniques'+getIconForControlLayer(smallElectronicsDevicesIconUrl))
        .addTo(map);

    WorkshopEnum.properties = {
        1: {icon: repairIcon, titlePrefix: 'Ateliers de co-réparation', group: repairSectionSubGroup},
        2: {icon: bicycleIcon, titlePrefix: 'uniquement Vélo', group: bicycleSubGroup},
        3: {icon: cameraIcon, titlePrefix: 'uniquement Appareils photo', group: cameraSubGroup},
		4: {icon: computersIcon, titlePrefix: 'uniquement Ordinateurs', group: computerSubGroup},
        5: {icon: fabrikIcon, titlePrefix: 'uniquement Tissu et vêtements', group: fabrikSubGroup},
        6: {icon: furnituresIcon, titlePrefix: 'uniquement Meubles', group: furnitureSubGroup},
        7: {icon: smallElectronicsDevicesIcon, titlePrefix: 'uniquement Petit appareils électroniques', group: smallElectronicsDevicesSubGroup},
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
    var icon = {icon: WorkshopEnum.properties[type].icon};

    // Add marker and popup to the cluser
    var marker = L.marker(new L.latLng(lat,lon), icon)
        .bindPopup(popup)
        .addTo(WorkshopEnum.properties[type].group);
}

/**
 * Get a title describing the shop type
 */
function getShopTitle(type, collaborative_repair_shopTag) {
    // Start text with italic style and add prefix depending on type
    var title = WorkshopEnum.properties[type].titlePrefix;

	/*
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
		.replace("[1]", ", le 1er du mois")
		.replace("[2]", ", le 2ème du mois")
		.replace("[3]", ", le 3ème du mois")
		.replace("[4]", ", le 4ème du mois")
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
 * Get the type of repair workshop
 */
 function getTypeRepair(fabrik, bicycle, camera, computers, fabrik, furniture, small_electronics_device) {
    var type = null;

	var nbKindOfRepair=0;
	if (fabrik=="yes")    { nbKindOfRepair++; }
	if (furniture=="yes") { nbKindOfRepair++; }
	if (computers=="yes") { nbKindOfRepair++; }
	if (camera=="yes") { nbKindOfRepair++; }
	if (bicycle=="yes") { nbKindOfRepair++; }
	if (small_electronics_device=="yes") { nbKindOfRepair++; }

	if (nbKindOfRepair>1) {
		type = WorkshopEnum.REPAIR;
	} else if (fabrik=="yes") {
		type = WorkshopEnum.FABRIK;
	} else if (furniture=="yes") {
		type = WorkshopEnum.FURNITURE;
	} else if (computers=="yes") {
		type = WorkshopEnum.COMPUTERS;
	} else if (camera=="yes") {
		type = WorkshopEnum.CAMERA;
	} else if (bicycle=="yes") {
		type = WorkshopEnum.BICYCLE;
	} else if (small_electronics_device=="yes") {
		type = WorkshopEnum.SMALLELECTRONICSDEVICES;
	}

    if (!type) {
        console.log("Unknown shop type with name="+name+" ; shopTag="+shopTag+" ; craftTag="+craftTag+" and amenityTag="+amenityTag+ " ; type="+type);
        type = null;
    }

    return type;
 }
/**
 * Parse a shop tag into a WorkshopEnum
 * @param shopTag the tag identifying the shop
 * @return the type of building as a WorkshopEnum
 */
function getTypeForShop(shopTag) {
    var type = null;

    switch(shopTag) {
        case "convenience":

            break;
        case "supermarket":
            type = WorkshopEnum.SUPERMARKET;
            break;
        case "butcher":
            type = WorkshopEnum.BUTCHER;
            break;
        case "dairy":
        case "cheese":
            type = WorkshopEnum.DAIRY;
            break;
        case  "greengrocer":
            type = WorkshopEnum.GREENGROCER;
            break;
    }

    return type;
 }

/**
 * Parse an amenity tag into a WorkshopEnum
 * @param shopTag the tag identifying the amenity
 * @return the type of building as a WorkshopEnum
 */
function getTypeForAmenity(amenityTag) {
    var type = null;

    switch(amenityTag) {
        case "association":
            type = WorkshopEnum.FAST_FOOD;
            break;
        case "restaurant":
            type = WorkshopEnum.RESTAURANT;
            break;
        case "cafe":
            type = WorkshopEnum.CAFE;
            break;
    }

    return type;
 }

/**
 * Parse a craft tag into a WorkshopEnum
 * @param shopTag the tag identifying the craft
 * @return the type of building as a WorkshopEnum
 */
function getTypeForCraft(craftTag) {
    var type = null;

    switch(craftTag) {
        case "caterer":
            type = WorkshopEnum.CATERER;
            break;
    }

    return type;
 }


/**
 * @return an HTML formatted website link
 */
function getHtmlFormattedWebsite(name, website) {
    if (!website) {
        return "";
    }

    return '<a href="' + website + '" target="_blank">' + name + '</a><br />';
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
