**Vrac à Nantes** is an open-source project that aims to ease people to buy products without packaging and therefore reduce the amount of generated wastes.

This project is focused on a particular part of France but can be used anywhere just changing the coordinates of the bounding box we want to display.

The result of this project is visible on [http://vracanantes.fr](http://vracanantes.fr)

# Data source
Almost no data is hosted by this project. The shops are registered on the Open Data map [OpenStreetMap](http://openstreetmap.org) and identified with the tag `bulk_purchase`. This tag describes if the shop is selling product without packaging. See [https://wiki.openstreetmap.org/wiki/Key:bulk_purchase](https://wiki.openstreetmap.org/wiki/Key:bulk_purchase) for details.

To get data from [OpenStreetMap](http://openstreetmap.org) , we use the [Overpass API](https://wiki.openstreetmap.org/wiki/Overpass_API) to search shops in a particular area applying some filters. You can see an example in our repository with the [getContent.html](https://github.com/vivreanantes/vracanantes/blob/master/getContent.html) that performs an [Overpass API](https://wiki.openstreetmap.org/wiki/Overpass_API) to get shops that have the value `yes` or `only` for the `bulk_purchase` tag. Some additional shops are also identified by their [OpenStreetMap](http://openstreetmap.org) identifier to complete the list and a blacklist is also possible to remove some shops that we don't want to be displayed on the map.

# Displaying shops on the map
To display the map this project uses the [Leaflet](http://leafletjs.com/) javascript library with some plugins. 

As many points could be in the same area, the project uses the MasterCluster plugin that allows to group some markers inside a cluster and easily zoom on a certain cluster. The library is available on the MasterCluster github here: [https://github.com/Leaflet/Leaflet.markercluster](https://github.com/Leaflet/Leaflet.markercluster)

To filter quickly the shop type, the project uses the plugin SubGroup. The source of the plugin is available here: https://github.com/ghybs/Leaflet.FeatureGroup.SubGroup

We created also our own plugin to display shops with a nice marker and popup using the [Overpass API](https://wiki.openstreetmap.org/wiki/Overpass_API) returned JSON. Don't hesitate to reuse this plugin. You can find the plugin source here: [https://github.com/vivreanantes/vracanantes/tree/master/lib/shopmarker](https://github.com/vivreanantes/vracanantes/tree/master/lib/shopmarker) and an example of implementation here: [https://github.com/vivreanantes/vracanantes/blob/master/vracanantes.js](https://github.com/vivreanantes/vracanantes/blob/master/vracanantes.js)
