module.exports = {
    externals: {
        wp: 'wp',
        react: 'React',
        'react-dom': 'ReactDOM',
    },
    entry: {
        admin: './src/admin.js',
        frontend: './src/frontend.js'
    },
    output: {
        path: __dirname,
        filename: 'build/[name].[contenthash].js',
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
