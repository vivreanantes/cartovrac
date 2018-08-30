// Urls of the picture for the different icons
var convenienceIconUrl = 'img/icons/icon_convenience.png';
var supermarketIconUrl = 'img/icons/icon_supermarket.png';
var butcherIconUrl = 'img/icons/icon_butcher.png';
var dairyIconUrl = 'img/icons/icon_dairy.png';
var greengrocerIconUrl = 'img/icons/icon_greengrocer.png';
var chocolateIconUrl = 'img/icons/icon_chocolate.png';
var bakeryIconUrl = 'img/icons/icon_bakery.png';
var coffeeShopIconUrl = 'img/icons/icon_coffeeShop.png';
var pastryIconUrl = 'img/icons/icon_pastry.png';
var deliIconUrl = 'img/icons/icon_deli.png';
var teaIconUrl = 'img/icons/icon_tea.png';
var confectioneryIconUrl = 'img/icons/icon_confectionery.png';
var seafoodIconUrl = 'img/icons/icon_seafood.png';
var agrarianIconUrl = 'img/icons/icon_agrarian.png';
var fastFoodIconUrl = 'img/icons/icon_fast_food.png';
var restaurantIconUrl = 'img/icons/icon_restaurant.png';
var cafeAmenityIconUrl = 'img/icons/icon_cafeAmenity.png';
var spicesIconUrl = 'img/icons/icon_spices.png';
var cosmeticsIconUrl = 'img/icons/icon_cosmetics.png';

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
      shadowUrl: 'img/marker-shadow.png',
      iconSize: [35, 57],
      iconAnchor: [15, 57],
      popupAnchor: [3, -58],
      shadowSize: [50, 50]
  });
}
