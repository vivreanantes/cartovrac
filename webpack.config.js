const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const WebpackShellPlugin = require('webpack-shell-plugin');

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
            test: /\.(png|jp(e*)g|svg|gif|woff2?)$/,  
            use: [{
                loader: 'url-loader',
                options: { 
                    limit: 8000, // Convert images < 8kb to base64 strings
                    name: 'images/[hash]-[name].[ext]'
                } 
            }]
      },
      {
            test:/\.(s*)css$/,
            use: ExtractTextPlugin.extract({ 
                fallback: 'style-loader',
                use: ['css-loader']
            })
      }
    ]
  },
  plugins: [
    new WebpackShellPlugin({onBuildStart:['./data/bulk/refreshCacheBulk.sh',  './data/partners/jtb/refreshCacheJTB.sh', './data/partners/cyclad/refreshCacheCyclad.sh', './data/copy_files_to_dist.sh'], onBuildEnd:[]}),
    new webpack.ProvidePlugin({
      $: 'jquery',
      L: 'leaflet'
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
      favicon: "./assets/img/logo.png"
    }),
    new ExtractTextPlugin("styles.css")
  ]
};
