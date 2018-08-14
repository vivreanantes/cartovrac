// Urls of the picture for the different icons
var repairIconUrl = 'icons/icon_convenience.png';
var bicycleIconUrl = 'icons/icon_supermarket.png';
var fabrikIconUrl = 'icons/icon_butcher.png';
var furnituresIconUrl = 'icons/icon_dairy.png';
var smallElectronicsDevicesIconUrl = 'icons/icon_greengrocer.png';
var computersIconUrl = 'icons/icon_bakery.png';

// Leaflet icons for the different types of shop
var repairIcon = getIcon(repairIconUrl);
var bicycleIcon = getIcon(bicycleIconUrl);
var fabrikIcon = getIcon(fabrikIconUrl);
var furnituresIcon = getIcon(furnituresIconUrl);
var smallElectronicsDevicesIcon = getIcon(smallElectronicsDevicesIconUrl);
var computersIcon = getIcon(computersIconUrl);

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
