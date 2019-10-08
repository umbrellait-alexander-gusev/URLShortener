const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Grab NODE_ENV and REACT_APP_* environment variables and prepare them to be
// injected into the application via DefinePlugin in Webpack configuration.
const REACT_APP = /^REACT_APP_/i;

const env = Object.keys(process.env)
  .filter((key) => REACT_APP.test(key))
  .reduce(
    (env, key) => {
      env[key] = process.env[key];
      return env;
    },
    {
      // Useful for determining whether we're running in production mode.
      // Most importantly, it switches React into the correct mode.
      NODE_ENV: process.env.NODE_ENV || 'development',
    },
  );

module.exports = {
    entry: "./main.js",
    output: {
        path: __dirname + '/public/',
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: [/node_modules/, /public/]
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['@babel/env', '@babel/react']
                }
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader!autoprefixer-loader",
                exclude: [/node_modules/, /public/]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.(gif|png|jpg|svg)$/,
                use: {
                    loader: 'url-loader'
                }
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name].[ext]'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            inject: "body"
        }),
        new webpack.DefinePlugin({
          ...Object.keys(env).reduce((result, key) => {
            result['process.env.' + key] = JSON.stringify(env[key]);
            return result;
          }, {}),
          'process.env': JSON.stringify(env),
        }),
    ],
    performance: {
        hints: false
    },
    devServer: {
        compress: true,
        disableHostCheck: true,
    },
    node: {
        fs: 'empty'
    }
};
