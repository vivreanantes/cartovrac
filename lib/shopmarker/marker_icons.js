// Urls of the picture for the different icons
var convenienceIconUrl = 'icons/icon_convenience.png';
var supermarketIconUrl = 'icons/icon_supermarket.png';
var butcherIconUrl = 'icons/icon_butcher.png';
var dairyIconUrl = 'icons/icon_dairy.png';
var greengrocerIconUrl = 'icons/icon_greengrocer.png';
var chocolateIconUrl = 'icons/icon_chocolate.png';
var bakeryIconUrl = 'icons/icon_bakery.png';
var coffeeShopIconUrl = 'icons/icon_coffeeShop.png';
var pastryIconUrl = 'icons/icon_pastry.png';
var deliIconUrl = 'icons/icon_deli.png';
var teaIconUrl = 'icons/icon_tea.png';
var confectioneryIconUrl = 'icons/icon_confectionery.png';
var seafoodIconUrl = 'icons/icon_seafood.png';
var agrarianIconUrl = 'icons/icon_agrarian.png';
var fastFoodIconUrl = 'icons/icon_fast_food.png';
var restaurantIconUrl = 'icons/icon_restaurant.png';
var cafeAmenityIconUrl = 'icons/icon_cafeAmenity.png';
var spicesIconUrl = 'icons/icon_spices.png';
var cosmeticsIconUrl = 'icons/icon_cosmetics.png';

// Leaflet icons for the different types of shop
var convenienceIcon = getIcon(convenienceIconUrl);
var supermarketIcon = getIcon(supermarketIconUrl);
var butcherIcon = getIcon(butcherIconUrl);
var dairyIcon = getIcon(dairyIconUrl);
var greengrocerIcon = getIcon(greengrocerIconUrl);
var chocolateIcon = getIcon(chocolateIconUrl);
var bakeryIcon = getIcon(bakeryIconUrl);
var coffeeShopIcon = getIcon(coffeeShopIconUrl);
var pastryIcon = getIcon(pastryIconUrl);
var deliIcon = getIcon(deliIconUrl);
var teaIcon = getIcon(teaIconUrl);
var confectioneryIcon = getIcon(confectioneryIconUrl);
var seafoodIcon = getIcon(seafoodIconUrl);
var agrarianIcon = getIcon(agrarianIconUrl);
var fastFoodIcon = getIcon(fastFoodIconUrl);
var restaurantIcon = getIcon(restaurantIconUrl);
var cafeAmenityIcon = getIcon(cafeAmenityIconUrl);
var spicesIcon = getIcon(spicesIconUrl);
var cosmeticsIcon = getIcon(cosmeticsIconUrl);

/**
 * Create a leaflet icon based on the url of the picto to display
 */
function getIcon(url) {
  return new L.Icon({
      iconUrl: url,
      shadowUrl: 'marker-shadow.png',
      iconSize: [35, 57],
      iconAnchor: [15, 57],
      popupAnchor: [3, -58],
      shadowSize: [50, 50]
  });
}
