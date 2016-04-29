var precss = require('precss');
var autoprefixer = require('autoprefixer');

module.exports = {
    entry: [
        './src/scripts/main.js',
        './src/styles/main.styl'
    ],
    output: {
        path: './static',
        filename: 'bundle.js',
        publicPath: '/'
    },
    devServer: {
        inline: true,
        contentBase: './static'
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
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: / v/,
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
                loader: 'style!css!postcss!stylus'
            },
            {
                test: /\.json$/,
                loader: 'json'
            }
        ]
    },
    postcss: function() {
        return [
            precss,
            autoprefixer({
                add: true,
                remove: false
            })
        ];
    }
};
