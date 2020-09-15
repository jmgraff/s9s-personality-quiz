const webpack = require('webpack');
const { merge } = require('webpack-merge');

module.exports = env => {
    const isPremium = env && env.premium;
    const isDebug = env && env.debug;

    const common = {
        externals: {
            wp: 'wp',
            react: 'React',
            'react-dom': 'ReactDOM',
            lodash: 'lodash'
        },
        entry: {
            admin: './src/admin.js',
            frontend: './src/frontend.js'
        },
        output: {
            path: __dirname,
            filename: `build/${env.target}/[name].[contenthash].js`
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                    },
                },
            ],
        },
    };

    const debug = {
        mode: 'development',
        devtool: 'inline-source-map',
    }

    const production = {
        mode: 'production'
    }

    const free = {
        plugins: [
            new webpack.DefinePlugin({
                PREMIUM: false
            })
        ]
    };

    const premium = {
        plugins: [
            new webpack.DefinePlugin({
                PREMIUM: true
            })
        ]
    };

    const configs = [
        common,
        isPremium ? premium : free,
        isDebug ? debug : production
    ];

    return merge(configs);
}
