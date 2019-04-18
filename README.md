# CartoVrac

[![CircleCI](https://circleci.com/gh/vivreanantes/cartovrac.svg?style=svg)](https://circleci.com/gh/vivreanantes/cartovrac)

**CartoVrac** is an open-source project that aims to ease people to buy products without packaging and therefore reduce the amount of generated wastes.

This project is focused on the France map but can be used anywhere just changing the coordinates of the bounding box we want to display and fetching right data from Overpass-API.

The result of this project is visible on [https://cartovrac.fr](https://cartovrac.fr) 

## Data source
Almost no data is hosted by this project. The shops are registered on the Open Data map [OpenStreetMap](https://openstreetmap.org) and identified with the tag `bulk_purchase`. This tag describes if the shop is selling products without packaging. See [https://wiki.openstreetmap.org/wiki/Key:bulk_purchase](https://wiki.openstreetmap.org/wiki/Key:bulk_purchase) for details.

To get data from [OpenStreetMap](http://openstreetmap.org) , we use the [Overpass API](https://wiki.openstreetmap.org/wiki/Overpass_API) to search shops in a particular area applying some filters. You can see an example in our repository with the script [refreshCache.sh](https://github.com/vivreanantes/cartovrac/blob/master/refreshCache.sh) that performs an [Overpass API](https://wiki.openstreetmap.org/wiki/Overpass_API) request to get shops that have the value `yes` or `only` for the `bulk_purchase` tag. Some additional shops are also identified by their [OpenStreetMap](http://openstreetmap.org) identifier to complete the list and a blacklist is also possible to remove some shops that we don't want to be displayed on the map.

## Displaying shops on the map
To display the map this project uses the [Leaflet](http://leafletjs.com/) javascript library with some plugins. 

As many points could be in the same area, the project uses the MasterCluster plugin that allows to group some markers inside a cluster and easily zoom on a certain cluster. The library is available on the MasterCluster github here: [https://github.com/Leaflet/Leaflet.markercluster](https://github.com/Leaflet/Leaflet.markercluster)

To filter quickly the shop type, the project uses the plugin SubGroup. The source of the plugin is available here: https://github.com/ghybs/Leaflet.FeatureGroup.SubGroup

We created also our own plugin to display shops with a nice marker and popup using the [Overpass API](https://wiki.openstreetmap.org/wiki/Overpass_API) returned JSON. Don't hesitate to reuse this plugin.
 
## How to use CartoVrac on your own country

CartoVrac is an HTML project that presents data extracted from [OpenStreetMap](https://openstreetmap.org) and completed with some specific data stored as JSON files.

### How to build CartoVrac

To build the project you will need to install Node.js first that contains npm, the dependency manager used for CartoVrac. Here is a link where you will find the latest Node.js version: https://nodejs.org/en/

Then using a terminal, clone your CartoVrac project that you may have forked before. Navigate inside the cloned project and install willebpack using npm: `npm install --save-dev webpack`

For more information about webpack please read: https://webpack.js.org/guides/installation/

Now you normally have everything ready to build the CartoVrac project.

Using a terminal, navigate to the CartoVrac folder and run the following npm command `npm run build`. A `dist` folder should be created with all the generated code inside.

Open this folder and find the `index.html` file. Open this file using a web browser. That's it! CartoVrac is built and you're using it! :)

If you need to modify the code, do your modifications, save it, re-build the project and the HTML will be updated to fit your need.

For more details on how this project works please read following documentation. Please, especially read the configuration section and change the Mapbox key.

### How to use CartoVrac on your own country

CartoVrac is an HTML project that presents data extracted from [OpenStreetMap](https://openstreetmap.org) and completed with some specific data stored as JSON files.

## How to build CartoVrac

To build the project you will need to install Node.js first that contains npm, the dependency manager used for CartoVrac. Here is a link where you will find the latest Node.js version: https://nodejs.org/en/

Then using a terminal, clone your CartoVrac project that you may have forked before. Navigate inside the cloned project and install willebpack using npm: `npm install --save-dev webpack`

For more information about webpack please read: https://webpack.js.org/guides/installation/

Now you normally have everything ready to build the CartoVrac project.

Using a terminal, navigate to the CartoVrac folder and run the following npm command `npm run build`. A `dist` folder should be created with all the generated code inside.

Open this folder and find the `index.html` file. Open this file using a web browser. That's it! CartoVrac is built and you're using it! :)

If you need to modify the code, do your modifications, save it, re-build the project and the HTML will be updated to fit your need.

For more details on how this project works please read following documentation. Please, especially read the configuration section and change the Mapbox key.

### Structure of the project

This project uses [webpack](https://webpack.js.org) to compile the project and [npm](https://www.npmjs.org) as dependencies manager.

#### Webpack

The `webpack.config.js` file contains the different plugins configurations, scripts and tasks that will be needed to compile the project.

It defines for example the instructions to fetch the OpenStreetMap data from the server, the plugin rules to minify CSS, javascript and HTML files, the plugin rules to add the pictures inside the HTML project and the tasks to define how to build and how to deploy the project.

#### npm

[npm](https://www.npmjs.org) is used to manage the project dependencies. The `package.json` file defines the dependencies and their versions that npm will have to install when launching a build.

#### Structure of the folders

The code and resources needed to build the code are split in the following folders:
- `src/`: all the javascript code of the project. The `index.js` file is the entry point that will be inserted in the HTML file. All other javascript files are inserted in the `index.js` file using inclusions at the top of each javascript fils.
- `data/`: the scripts used to fetch the data from the OpenStreetMap server and the additionnal JSON files.
- `assets/`: the images used inside the project (icons of the markers, open-graph preview, favicon...)
- `dist/`: the HTML project generates by the npm build.

### Configure the project

#### Mapbox Token

CartoVrac uses Mapbox as tile provider for the map. You're free to continue to use Mapbox or to change for another tile provider. But ... if you continue using Mapbox you'll have to create a Mapbox Token to access the Mapbox APIs. 

Please create a Mapbox Token and replace the current one that is stored in: `./src/config.js` as `mapToken` property.# Structure of the project

This project uses [webpack](https://webpack.js.org) to compile the project and [npm](https://www.npmjs.org) as dependencies manager.

#### Webpack

The `webpack.config.js` file contains the different plugins configurations, scripts and tasks that will be needed to compile the project.

It defines for example the instructions to fetch the OpenStreetMap data from the server, the plugin rules to minify CSS, javascript and HTML files, the plugin rules to add the pictures inside the HTML project and the tasks to define how to build and how to deploy the project.

#### npm

[npm](https://www.npmjs.org) is used to manage the project dependencies. The `package.json` file defines the dependencies and their versions that npm will have to install when launching a build.

#### Structure of the folders

The code and resources needed to build the code are split in the following folders:
- `src/`: all the javascript code of the project. The `index.js` file is the entry point that will be inserted in the HTML file. All other javascript files are inserted in the `index.js` file using inclusions at the top of each javascript fils.
- `data/`: the scripts used to fetch the data from the OpenStreetMap server and the additionnal JSON files.
- `assets/`: the images used inside the project (icons of the markers, open-graph preview, favicon...)
- `dist/`: the HTML project generates by the npm build.

## Configure the project

### Mapbox Token

CartoVrac uses Mapbox as tile provider for the map. You're free to continue to use Mapbox or to change for another tile provider. But ... if you continue using Mapbox you'll have to create a Mapbox Token to access the Mapbox APIs. 

Please create a Mapbox Token and replace the current one that is stored in: `./src/config.js` as `mapToken` property.
