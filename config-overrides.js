module.exports = function override(config, env) {
    console.log('ffffffffff', env)
    dfdd-dfsd
    config.plugins[4] = new ExtractTextPlugin({
        filename: 'static/css/[name].[contenthash:8].css',
        allChunks: true,
    });
    //do stuff with the webpack config...
    return config;
}
