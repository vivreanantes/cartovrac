const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackSynchronizableShellPlugin = require('webpack-synchronizable-shell-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.(png|jp(e*)g|svg|gif|webp|woff2?)$/,  
        use: [{
            loader: 'url-loader',
            options: { 
                limit: 1000,
                name: 'images/[hash]-[name].[ext]',
                esModule: false
            } 
        }]
      },
      {
        test: /\.(s*)css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      }
    ]
  },
  plugins: [
    new WebpackSynchronizableShellPlugin(
      {
        onBuildStart: {
          scripts: [
             // './data/refreshCacheBulk.sh',  
             // 'node src/prepare.js',
             // 'cp ./data/itinerant.json ./dist/itinerant.json'
          ],
          blocking: true,
          parallel: false
        }, 
        onBuildEnd:[]
      }
    ),
    new webpack.ProvidePlugin({
      $: 'jquery',
      L: 'leaflet'
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
      favicon: "./assets/img/logo.png"
    }),
    new MiniCssExtractPlugin()
  ]
};
