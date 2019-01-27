const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

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
