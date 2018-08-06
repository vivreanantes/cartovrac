// Sub-groups
var bulkSectionSubGroup;
var butcherShopSubGroup;
var dairyShopSubGroup;
var greengrocerShopSubGroup;
var bakeryShopSubGroup;
var coffeeAndTeaShopSubGroup;
var deliShopSubGroup;
var pastryShopSubGroup;
var seafoodShopSubGroup;
var agrarianShopSubGroup;
var restaurantAndFastFoodShopSubGroup;
var confectioneryAndChocolateShopSubGroup;
var cafeShopSubGroup;
var catererCraftSubGroup;

// List of managed shops
var ShopEnum = {
  CONVENIENCE: 1,
  SUPERMARKET: 2,
  BUTCHER: 3,
  DAIRY: 4,
  GREENGROCER: 5,
  BAKERY: 6,
  COFFEE: 7,
  PASTRY: 8,
  DELI: 9,
  TEA: 10,
  CONFECTIONERY: 11,
  SEAFOOD: 12,
  AGRARIAN: 13,
  FAST_FOOD: 14,
  RESTAURANT: 15,
  CAFE: 16,
  CATERER: 17,
  CHOCOLATE: 18,
  SPICES: 19,
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
    bulkSectionSubGroup = L.featureGroup.subGroup(cluster).addTo(map);
    butcherShopSubGroup = L.featureGroup.subGroup(cluster).addTo(map);
    dairyShopSubGroup = L.featureGroup.subGroup(cluster).addTo(map);
    greengrocerShopSubGroup = L.featureGroup.subGroup(cluster).addTo(map);
    bakeryShopSubGroup = L.featureGroup.subGroup(cluster).addTo(map);
    coffeeAndTeaShopSubGroup = L.featureGroup.subGroup(cluster).addTo(map);
    deliShopSubGroup = L.featureGroup.subGroup(cluster).addTo(map);
    pastryShopSubGroup = L.featureGroup.subGroup(cluster).addTo(map);
    seafoodShopSubGroup = L.featureGroup.subGroup(cluster).addTo(map);
    agrarianShopSubGroup = L.featureGroup.subGroup(cluster).addTo(map);
    restaurantAndFastFoodShopSubGroup = L.featureGroup.subGroup(cluster).addTo(map);
    confectioneryAndChocolateShopSubGroup = L.featureGroup.subGroup(cluster).addTo(map);
    cafeShopSubGroup = L.featureGroup.subGroup(cluster).addTo(map);
    catererCraftSubGroup = L.featureGroup.subGroup(cluster).addTo(map);

    // and add them to the control
    L.control.layers(null, null, { collapsed: true })
        .addOverlay(bulkSectionSubGroup, 'Magasins avec rayon vrac'+getIconForControlLayer(convenienceIconUrl)+getIconForControlLayer(supermarketIconUrl))
        .addOverlay(butcherShopSubGroup, 'Boucheries & charcuteries'+getIconForControlLayer(butcherIconUrl))
        .addOverlay(dairyShopSubGroup, 'Crèmeries'+getIconForControlLayer(dairyIconUrl))
        .addOverlay(greengrocerShopSubGroup, 'Primeurs'+getIconForControlLayer(greengrocerIconUrl))
        .addOverlay(bakeryShopSubGroup, 'Boulangeries'+getIconForControlLayer(bakeryIconUrl))
        .addOverlay(coffeeAndTeaShopSubGroup, 'Magasins de thé et café'+getIconForControlLayer(coffeeShopIconUrl)+getIconForControlLayer(teaIconUrl))
        .addOverlay(deliShopSubGroup, 'Épiceries fines'+getIconForControlLayer(deliIconUrl)+getIconForControlLayer(spicesIconUrl))
        .addOverlay(pastryShopSubGroup, 'Pâtissiers'+getIconForControlLayer(pastryIconUrl))
        .addOverlay(seafoodShopSubGroup, 'Poissoneries'+getIconForControlLayer(seafoodIconUrl))
        .addOverlay(agrarianShopSubGroup, 'Magasin de producteur(s)'+getIconForControlLayer(agrarianIconUrl))
        .addOverlay(restaurantAndFastFoodShopSubGroup, 'Restaurants & Fast-foods'+getIconForControlLayer(restaurantIconUrl)+getIconForControlLayer(fastFoodIconUrl))
        .addOverlay(confectioneryAndChocolateShopSubGroup, 'Confiseries & chocolatiers'+getIconForControlLayer(confectioneryIconUrl)+getIconForControlLayer(chocolateIconUrl))
        .addOverlay(cafeShopSubGroup, 'Cafés & bars'+getIconForControlLayer(cafeAmenityIconUrl))
        .addOverlay(catererCraftSubGroup, 'Traiteurs'+getIconForControlLayer(restaurantIconUrl))
        .addTo(map);

    ShopEnum.properties = {
        1: {icon: convenienceIcon, titlePrefix: 'Épicerie', group: bulkSectionSubGroup},
        2: {icon: supermarketIcon, titlePrefix: 'Supermarché', group: bulkSectionSubGroup},
        3: {icon: butcherIcon, titlePrefix: 'Boucherie', group: butcherShopSubGroup},
        4: {icon: dairyIcon, titlePrefix: 'Crèmerie', group: dairyShopSubGroup},
        5: {icon: greengrocerIcon, titlePrefix: 'Primeur', group: greengrocerShopSubGroup},
        6: {icon: bakeryIcon, titlePrefix: 'Boulangerie', group: bakeryShopSubGroup},
        7: {icon: coffeeShopIcon, titlePrefix: 'Torrefacteur', group: coffeeAndTeaShopSubGroup},
        8: {icon: pastryIcon, titlePrefix: 'Pâtisserie', group: pastryShopSubGroup},
        9: {icon: deliIcon, titlePrefix: 'Épicerie fine', group: deliShopSubGroup},
        10: {icon: teaIcon, titlePrefix: 'Magasin de thé', group: coffeeAndTeaShopSubGroup},
        11: {icon: confectioneryIcon, titlePrefix: 'Confiserie', group: confectioneryAndChocolateShopSubGroup},
        12: {icon: seafoodIcon, titlePrefix: 'Poissonerie', group: seafoodShopSubGroup},
        13: {icon: agrarianIcon, titlePrefix: 'Magasin de producteur(s)', group: agrarianShopSubGroup},
        14: {icon: fastFoodIcon, titlePrefix: 'Fast-food', group: restaurantAndFastFoodShopSubGroup},
        15: {icon: restaurantIcon, titlePrefix: 'Restaurant', group: restaurantAndFastFoodShopSubGroup},
        16: {icon: cafeAmenityIcon, titlePrefix: 'Café', group: cafeShopSubGroup},
        17: {icon: restaurantIcon, titlePrefix: 'Traiteur', group: catererCraftSubGroup},
        18: {icon: chocolateIcon, titlePrefix: 'Chocolatier', group: confectioneryAndChocolateShopSubGroup},
        19: {icon: spicesIcon, titlePrefix: "Magasin d'épices", group: deliShopSubGroup}
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
function getShopTitle(type, organicTag, bulk_purchaseTag) {
    // Start text with italic style and add prefix depending on type
    var title = ShopEnum.properties[type].titlePrefix;

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
        case  "chocolate":
            type = ShopEnum.CHOCOLATE;
            break;
        case  "bakery":
            type = ShopEnum.BAKERY;
            break;
        case  "coffee":
            type = ShopEnum.COFFEE;
            break;
        case  "pastry":
            type = ShopEnum.PASTRY;
            break;
        case  "deli":
            type = ShopEnum.DELI;
            break;
        case  "tea":
            type = ShopEnum.TEA;
            break;
        case  "confectionery":
            type = ShopEnum.CONFECTIONERY;
            break;
        case  "seafood":
            type = ShopEnum.SEAFOOD;
            break;
        case  "farm":
        case  "agrarian":
            type = ShopEnum.AGRARIAN;
            break;
        case "spices":
            type = ShopEnum.SPICES;
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
        case "fast_food":
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
function getHtmlFormattedWebsite(website, contactWebsite, facebookUrl, contactFacebookUrl) {
    var url;

    if (website) {
        url = website;
    } else if (contactWebsite) {
        url = contactWebsite;
    } else if (facebookUrl) {
        url = facebookUrl;
    } else if (contactFacebookUrl) {
        url = contactFacebookUrl;
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