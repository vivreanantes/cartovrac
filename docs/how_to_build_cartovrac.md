---
title: Documentation - How to build CartoVrac
---

## How to build CartoVrac

To build the project you will need to install Node.js first that contains npm, the dependency manager used for CartoVrac. Here is a link where you will find the latest Node.js version: [https://nodejs.org/en/](https://nodejs.org/en/){:target="_blank"}

Then using a terminal, clone your CartoVrac project that you may have forked before. Navigate inside the cloned project and install willebpack using npm: `npm install --save-dev webpack`

For more information about webpack please read: [https://webpack.js.org/guides/installation/](https://webpack.js.org/guides/installation/){:target="_blank"}

Now you normally have everything ready to build the CartoVrac project.

Using a terminal, navigate to the CartoVrac folder and run the following npm command `npm run build`. A `dist` folder should be created with all the generated code inside.

Open this folder and find the `index.html` file. Open this file using a web browser. That's it! CartoVrac is built and you're using it! :)

If you need to modify the code, do your modifications, save it, re-build the project and the HTML will be updated to fit your need.

For more details on how this project works please read following documentation. Please, especially read the configuration section and change the Mapbox key.

### Structure of the project

This project uses [webpack](https://webpack.js.org){:target="_blank"} to compile the project and [npm](https://www.npmjs.org){:target="_blank"} as dependencies manager.

#### Webpack

The `webpack.config.js` file contains the different plugins configurations, scripts and tasks that will be needed to compile the project.

It defines for example the instructions to fetch the OpenStreetMap data from the server, the plugin rules to minify CSS, javascript and HTML files, the plugin rules to add the pictures inside the HTML project and the tasks to define how to build and how to deploy the project.

#### npm

[npm](https://www.npmjs.org){:target="_blank"} is used to manage the project dependencies. The `package.json` file defines the dependencies and their versions that npm will have to install when launching a build.

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

### Use the Continuous Integration

CartoVrac uses [CircleCI](https://circleci.com/){:target="_blank"} for continuous integration. The CI automatically builds the project and fetches the data from OpenStreetMap 4 times a day, then deploys it to the CartoVrac server. The script for the CircleCI configuration is available under the `.circleci`folder.

On the CircleCI configuration, there are two jobs: 
- `build` that fetches the data on OpenStreetMap and builds the CartoVrac project with it
- `deploy` that takes all generated files and push them to the server

The `deploy`job needs 3 environment variables to be defined on CircleCi in order to work correctly. Theses 3 environment variables are used by the deploy.js file to allow the CI to access the server via SFTP and push the generated files.

Here are the variables to define on CircleCI configuration:
- `FTP_HOST`: the host of the FTP
- `FTP_USER`: the user name of the FTP
- `FTP_PASSWORD`: the password of the FTP.

To define environment variable on CircleCI, please follow this tutorial: [https://circleci.com/docs/2.0/env-vars/#setting-an-environment-variable-in-a-project](https://circleci.com/docs/2.0/env-vars/#setting-an-environment-variable-in-a-project){:target="_blank"}

**Warning** - Your server needs to allow SFTP and not only FTP.
