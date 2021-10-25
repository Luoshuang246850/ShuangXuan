
module.exports = {
    devServer: {
        // proxy: {
        //     '/back': {
        //         target: 'http://1.15.243.210:8080/',
		// 		// pathRewrite:{'^/api':''}
        //         changeOrigin: true
        //     },
        // }
			proxyTable:{
				'/back':{
					target:'http://1.15.243.210:8080/',
					// changeOrigin:true
					pathRewrite:{'^/back':''}
				},
			}
    },

};
