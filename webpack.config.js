module.exports = {
    externals: {
        wp: 'wp',
        react: 'React',
        'react-dom': 'ReactDOM',
    },
    entry: './src/admin.js',
    output: {
        path: __dirname,
        filename: 'build/admin.bundle.js',
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
