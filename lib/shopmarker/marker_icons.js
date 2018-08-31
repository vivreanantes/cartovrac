// Urls of the picture for the different icons
var pathToIcons = 'img/icons/';
var convenienceIconUrl = pathToIcons + 'icon_convenience.png';
var supermarketIconUrl = pathToIcons + 'icon_supermarket.png';
var butcherIconUrl = pathToIcons + 'icon_butcher.png';
var dairyIconUrl = pathToIcons + 'icon_dairy.png';
var greengrocerIconUrl = pathToIcons + 'icon_greengrocer.png';
var chocolateIconUrl = pathToIcons + 'icon_chocolate.png';
var bakeryIconUrl = pathToIcons + 'icon_bakery.png';
var coffeeShopIconUrl = pathToIcons + 'icon_coffeeShop.png';
var pastryIconUrl = pathToIcons + 'icon_pastry.png';
var deliIconUrl = pathToIcons + 'icon_deli.png';
var teaIconUrl = pathToIcons + 'icon_tea.png';
var confectioneryIconUrl = pathToIcons + 'icon_confectionery.png';
var seafoodIconUrl = pathToIcons + 'icon_seafood.png';
var agrarianIconUrl = pathToIcons + 'icon_agrarian.png';
var fastFoodIconUrl = pathToIcons + 'icon_fast_food.png';
var restaurantIconUrl = pathToIcons + 'icon_restaurant.png';
var cafeAmenityIconUrl = pathToIcons + 'icon_cafeAmenity.png';
var spicesIconUrl = pathToIcons + 'icon_spices.png';
var cosmeticsIconUrl = pathToIcons + 'icon_cosmetics.png';

// Leaflet icons for the different types of shop
var ShopIcon = L.Icon.extend({
    options: {
      shadowUrl: 'img/marker-shadow.png',
      iconSize: [35, 57],
      iconAnchor: [15, 57],
      popupAnchor: [3, -58],
      shadowSize: [50, 50]
  }
});

var convenienceIcon = new ShopIcon({iconUrl: convenienceIconUrl});
var supermarketIcon = new ShopIcon({iconUrl: supermarketIconUrl});
var butcherIcon = new ShopIcon({iconUrl: butcherIconUrl});
var dairyIcon = new ShopIcon({iconUrl: dairyIconUrl});
var greengrocerIcon = new ShopIcon({iconUrl: greengrocerIconUrl});
var chocolateIcon = new ShopIcon({iconUrl: chocolateIconUrl});
var bakeryIcon = new ShopIcon({iconUrl: bakeryIconUrl});
var coffeeShopIcon = new ShopIcon({iconUrl: coffeeShopIconUrl});
var pastryIcon = new ShopIcon({iconUrl: pastryIconUrl});
var deliIcon = new ShopIcon({iconUrl: deliIconUrl});
var teaIcon = new ShopIcon({iconUrl: teaIconUrl});
var confectioneryIcon = new ShopIcon({iconUrl: confectioneryIconUrl});
var seafoodIcon = new ShopIcon({iconUrl: seafoodIconUrl});
var agrarianIcon = new ShopIcon({iconUrl: agrarianIconUrl});
var fastFoodIcon = new ShopIcon({iconUrl: fastFoodIconUrl});
var restaurantIcon = new ShopIcon({iconUrl: restaurantIconUrl});
var cafeAmenityIcon = new ShopIcon({iconUrl: cafeAmenityIconUrl});
var spicesIcon = new ShopIcon({iconUrl: spicesIconUrl});
var cosmeticsIcon = new ShopIcon({iconUrl: cosmeticsIconUrl});

