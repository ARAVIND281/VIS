module.exports = (env, argv) => {

    if (argv.mode === 'development') {
        config.devtool = 'source-map';
    }

    if (argv.mode === 'production') {
        //...
    }

    return config;
};

var config = {
    entry: './app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
            filename: 'my-first-webpack.bundle.js'
    }

};