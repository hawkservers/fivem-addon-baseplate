const prodConfig = require('./webpack.prod');
const devConfig = require('./webpack.dev');

module.exports = (env, argv) => {
    if (argv.mode === 'production') {
        return prodConfig;
    }

    return devConfig;
};
