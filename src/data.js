// Leaflet icons for the different types of shop
var ShopIcon = L.Icon.extend({
    options: {
      shadowUrl: require('../assets/img/marker-shadow.png'),
      iconSize: [35, 57],
      iconAnchor: [15, 57],
      popupAnchor: [3, -58],
      shadowSize: [50, 50]
  }
});

export var categories = {
  convenience: {prefix: 'Épicerie', icon: new ShopIcon({iconUrl: require('../assets/img/icons/icon_convenience.png')})},
  supermarket: {prefix: 'Supermarché', icon: new ShopIcon({iconUrl: require('../assets/img/icons/icon_supermarket.png')})},
  butcher: {prefix: 'Boucherie', icon: new ShopIcon({iconUrl: require('../assets/img/icons/icon_butcher.png')})},
  dairy: {prefix: 'Crèmerie', icon: new ShopIcon({iconUrl: require('../assets/img/icons/icon_dairy.png')})},
  cheese: {prefix: 'Fromagerie', icon: new ShopIcon({iconUrl: require('../assets/img/icons/icon_dairy.png')})},
  greengrocer: {prefix: 'Primeur', icon: new ShopIcon({iconUrl: require('../assets/img/icons/icon_greengrocer.png')})},
  bakery: {prefix: 'Boulangerie', icon: new ShopIcon({iconUrl: require('../assets/img/icons/icon_bakery.png')})},
  coffee: {prefix: 'Torrefacteur', icon: new ShopIcon({iconUrl: require('../assets/img/icons/icon_coffeeShop.png')})},
  pastry: {prefix: 'Pâtisserie', icon: new ShopIcon({iconUrl: require('../assets/img/icons/icon_pastry.png')})},
  deli: {prefix: 'Épicerie fine', icon: new ShopIcon({iconUrl: require('../assets/img/icons/icon_deli.png')})},
  tea: {prefix: 'Magasin de thé', icon: new ShopIcon({iconUrl: require('../assets/img/icons/icon_tea.png')})},
  confectionery: {prefix: 'Confiserie', icon: new ShopIcon({iconUrl: require('../assets/img/icons/icon_confectionery.png')})},
  seafood: {prefix: 'Poissonerie', icon: new ShopIcon({iconUrl: require('../assets/img/icons/icon_seafood.png')})},
  agrarian: {prefix: 'Magasin de producteur(s)', icon: new ShopIcon({iconUrl: require('../assets/img/icons/icon_agrarian.png')})},
  fast_food: {prefix: 'Fast-food', icon: new ShopIcon({iconUrl: require('../assets/img/icons/icon_fast_food.png')})},
  restaurant: {prefix: 'Restaurant', icon: new ShopIcon({iconUrl: require('../assets/img/icons/icon_restaurant.png')})},
  cafe: {prefix: 'Café', icon: new ShopIcon({iconUrl: require('../assets/img/icons/icon_cafeAmenity.png')})},
  caterer: {prefix: 'Traiteur', icon: new ShopIcon({iconUrl: require('../assets/img/icons/icon_restaurant.png')})},
  chocolate: {prefix: 'Chocolatier', icon: new ShopIcon({iconUrl: require('../assets/img/icons/icon_chocolate.png')})},
  spices: {prefix: "Magasin d'épices", icon: new ShopIcon({iconUrl: require('../assets/img/icons/icon_spices.png')})},
  cosmetics: {prefix: 'Magasin de cosmétiques', icon: new ShopIcon({iconUrl: require('../assets/img/icons/icon_cosmetics.png')})}
};

export var shopDataFiles = {
  fr: {fileName: 'cache_data.json'}
};