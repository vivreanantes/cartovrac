export var categories = {
  only_bulk_convenience: {prefix: 'Épicerie 100% vrac', iconUrl: require('../assets/img/icons/icon_bulk_only.png'), addOrganicSuffix: true, addBulkSuffix: false},
  itinerant: {prefix: 'Épicerie itinérante 100% vrac', iconUrl: require('../assets/img/icons/icon_marketplace.png'), addOrganicSuffix: true, addBulkSuffix: false},
  convenience: {prefix: 'Épicerie avec rayon vrac', iconUrl: require('../assets/img/icons/icon_convenience.png'), addOrganicSuffix: true, addBulkSuffix: false},
  organic_supermarket: {prefix: 'Supermarché bio. avec rayon vrac', iconUrl: require('../assets/img/icons/icon_supermarket.png'), addOrganicSuffix: false, addBulkSuffix: false},
  cooperative_supermarket: {prefix: 'Supermarché coopératif avec rayon vrac', iconUrl: require('../assets/img/icons/icon_supermarket.png'), addOrganicSuffix: true, addBulkSuffix: false},
  farm: {prefix: 'Magasin de producteur(s)', iconUrl: require('../assets/img/icons/icon_agrarian.png'), addOrganicSuffix: true, addBulkSuffix: true},
  butcher: {prefix: 'Boucherie', iconUrl: require('../assets/img/icons/icon_butcher.png'), addOrganicSuffix: true, addBulkSuffix: true},
  dairy: {prefix: 'Crèmerie', iconUrl: require('../assets/img/icons/icon_dairy.png'), addOrganicSuffix: true, addBulkSuffix: true},
  cheese: {prefix: 'Fromagerie', iconUrl: require('../assets/img/icons/icon_dairy.png'), addOrganicSuffix: true, addBulkSuffix: true},
  greengrocer: {prefix: 'Primeur', iconUrl: require('../assets/img/icons/icon_greengrocer.png'), addOrganicSuffix: true, addBulkSuffix: true},
  bakery: {prefix: 'Boulangerie', iconUrl: require('../assets/img/icons/icon_bakery.png'), addOrganicSuffix: true, addBulkSuffix: true},
  coffee: {prefix: 'Torrefacteur', iconUrl: require('../assets/img/icons/icon_coffeeShop.png'), addOrganicSuffix: true, addBulkSuffix: true},
  pastry: {prefix: 'Pâtisserie', iconUrl: require('../assets/img/icons/icon_pastry.png'), addOrganicSuffix: true, addBulkSuffix: true},
  deli: {prefix: 'Épicerie fine', iconUrl: require('../assets/img/icons/icon_deli.png'), addOrganicSuffix: true, addBulkSuffix: true},
  tea: {prefix: 'Magasin de thé', iconUrl: require('../assets/img/icons/icon_tea.png'), addOrganicSuffix: true, addBulkSuffix: true},
  confectionery: {prefix: 'Confiserie', iconUrl: require('../assets/img/icons/icon_confectionery.png'), addOrganicSuffix: true, addBulkSuffix: true},
  seafood: {prefix: 'Poissonerie', iconUrl: require('../assets/img/icons/icon_seafood.png'), addOrganicSuffix: true, addBulkSuffix: true},
  fast_food: {prefix: 'Fast-food', iconUrl: require('../assets/img/icons/icon_fast_food.png'), addOrganicSuffix: true, addBulkSuffix: true},
  restaurant: {prefix: 'Restaurant', iconUrl: require('../assets/img/icons/icon_restaurant.png'), addOrganicSuffix: true, addBulkSuffix: true},
  cafe: {prefix: 'Café', iconUrl: require('../assets/img/icons/icon_cafeAmenity.png'), addOrganicSuffix: true, addBulkSuffix: true},
  caterer: {prefix: 'Traiteur', iconUrl: require('../assets/img/icons/icon_restaurant.png'), addOrganicSuffix: true, addBulkSuffix: true},
  chocolate: {prefix: 'Chocolatier', iconUrl: require('../assets/img/icons/icon_chocolate.png'), addOrganicSuffix: true, addBulkSuffix: true},
  spices: {prefix: "Magasin d'épices", iconUrl: require('../assets/img/icons/icon_spices.png'), addOrganicSuffix: true, addBulkSuffix: true},
  cosmetics: {prefix: 'Magasin de cosmétiques', iconUrl: require('../assets/img/icons/icon_cosmetics.png'), addOrganicSuffix: true, addBulkSuffix: true},
  herbalist: {prefix: 'Herboriste', iconUrl: require('../assets/img/icons/icon_herbalist.png'), addOrganicSuffix: true, addBulkSuffix: true},
  alcohol: {prefix: 'Magasin de vente d\'alcool à emporter', iconUrl: require('../assets/img/icons/icon_alcohol.png'), addOrganicSuffix: true, addBulkSuffix: true},
  chemist: {prefix: 'Droguerie', iconUrl: require('../assets/img/icons/icon_chemist.png'), addOrganicSuffix: true, addBulkSuffix: true}
};

export var cacheJtbJson = require("../cache_jtb_data_simplified.json");
export var cacheCycladJson = require("../cache_cyclad_data_simplified.json");
export var cacheBulkJson = require("../cache_bulk_data_simplified.json");
export var itinerantJson = require("../data/bulk/itinerant.json");