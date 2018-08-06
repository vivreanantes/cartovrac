// Urls of the picture for the different icons
var convenienceIconUrl = 'icons/icon_convenience.png';
var supermarketIconUrl = 'icons/icon_supermarket.png';
var butcherIconUrl = 'icons/icon_butcher.png';
var dairyIconUrl = 'icons/icon_dairy.png';
var greengrocerIconUrl = 'icons/icon_greengrocer.png';
var bakeryIconUrl = 'icons/icon_bakery.png';

// Leaflet icons for the different types of shop
var convenienceIcon = getIcon(convenienceIconUrl);
var supermarketIcon = getIcon(supermarketIconUrl);
var butcherIcon = getIcon(butcherIconUrl);
var dairyIcon = getIcon(dairyIconUrl);
var greengrocerIcon = getIcon(greengrocerIconUrl);
var bakeryIcon = getIcon(bakeryIconUrl);

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
