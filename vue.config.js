module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? './canvas' : '/',
    devServer: {
        proxy: {
            '/api': {
                target: 'http://www.dn1601.com', //http://www.dn1601.com/
                pathRewrite: {
                    '^/api': ''   
                }
            }
        }
    }
};