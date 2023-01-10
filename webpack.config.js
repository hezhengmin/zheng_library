const { VueLoaderPlugin } = require("vue-loader");
const htmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const Dotenv = require('dotenv-webpack');//設置全局變量

module.exports = {
  entry: {
    main: "./src/main.js",
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.(sass|css|scss)$/,
        use: [{
            // inject CSS to page
            loader: 'style-loader'
        }, {
            // translates CSS into CommonJS modules
            loader: 'css-loader'
        }, {
            // Run postcss actions
            loader: 'postcss-loader',
            options: {
                // `postcssOptions` is needed for postcss 8.x;
                // if you use postcss 7.x skip the key
                postcssOptions: {
                    // postcss plugins, can be exported to postcss.config.js
                    plugins: function () {
                        return [
                            require('autoprefixer')
                        ];
                    }
                }
            }
        }, {
            // compiles Sass to CSS
            loader: 'sass-loader'
        }]
    },
      {
        test: /\.(eot|ttf|woff|woff2)(\?\S*)?$/,
        loader: "file-loader",
      },
      {
        test: /\.(png|jpe?g|gif|webm|mp4|svg)$/,
        loader: "file-loader",
        options: {
          name: "[name][contenthash:8].[ext]",
          outputPath: "assets/img",
          esModule: false,
        },
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new htmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
      favicon: "./public/favicon.ico",
    }),
    //設置全局變量 https://www.npmjs.com/package/dotenv-webpack 
    new Dotenv() 
  ],
  resolve: {
    alias: {
      vue$: "vue/dist/vue.runtime.esm.js",
      api$: path.resolve('src/api/api.js'),
      mixin$:path.resolve('src/mixin/index.js'),
    },
    extensions: ["*", ".js", ".vue", ".json"],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    open: true,
  },
};
