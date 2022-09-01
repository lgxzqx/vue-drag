module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? './canvas' : '/',
    devServer: {
        proxy: {
            '/api': {
                target: 'http://xhhae1.y02.dn160.com.cn', //http://www.dn1601.com/
                pathRewrite: {
                    '^/api': ''   
                }
            }
        }
    }
};