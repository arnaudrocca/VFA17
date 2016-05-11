var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var precss = require('precss');
var autoprefixer = require('autoprefixer');

module.exports = {
    entry: [
        './src/scripts/main.js',
        './src/styles/main.styl'
    ],
    output: {
        path: path.join(__dirname, 'build'),
        filename: '[name]-[hash].min.js',
        publicPath: '/'
    },
    devServer: {
        inline: true,
        contentBase: './static',
        outputPath: path.join(__dirname, 'build')
    },
    resolve: {
        modulesDirectories: ['node_modules'],
        root: '',
        alias: {
            Draggable: __dirname + '/node_modules/gsap/src/uncompressed/utils/Draggable.js',
            CSSPlugin: __dirname + '/node_modules/gsap/src/uncompressed/plugins/CSSPlugin.js',
            TweenLite: __dirname + '/node_modules/gsap/src/uncompressed/TweenMax.js'
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/templates/index.tpl.html',
            inject: 'body',
            filename: 'index.html'
        }),
        new CopyWebpackPlugin(
            [{
                from: 'static'
            }],
            {
                ignore: ['.DS_Store', '.keep']
            }
        ),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true
                // pure_funcs: ['console.log']
            }
        }),
        new ExtractTextPlugin('[name]-[hash].min.css', { allChunks: true }),
        new CleanWebpackPlugin(['build'], { root: __dirname }),
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: ['/node_modules/', '/ v/'],
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react'],
                    plugins: ['add-module-exports']
                }
            },
            {
                test: /(Draggable | CSSPlugin)\.js$/,
                loader: 'imports?define=>false'
            },
            {
                test: /\.styl$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract('style', 'css!postcss!stylus')
            },
            {
                test: /\.json$/,
                exclude: /node_modules/,
                loader: 'json'
            },
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                exclude: /node_modules/,
                loader : 'file-loader'
            }
        ]
    },
    postcss: function() {
        return [
            precss,
            autoprefixer({
                add: true,
                remove: true
            })
        ];
    }
};
