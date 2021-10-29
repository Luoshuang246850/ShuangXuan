
module.exports = {
    devServer: {
<<<<<<< HEAD
        proxy: {
            '/back': {
                target: 'http://172.17.49.29:8080/',
				// pathRewrite:{'^/api':''}
                changeOrigin: true
            },
			'/getCaptcha':{
				target:'http://172.17.49.29:8080/',
				changeOrigin:true
			},
			'/admin':{
				target:'http://172.17.49.29:8080/',
				changeOrigin:true
			},
			'/judgeCaptcha':{
				target:'http://172.17.49.29:8080/',
				changeOrigin:true
			}
        }
			// proxyTable:{
			// 	'/back':{
			// 		target:'http://1.15.243.210:8080/',
			// 		// changeOrigin:true
			// 		pathRewrite:{'^/back':''}
			// 	},
			// }
=======
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
>>>>>>> 9c64dd2a89f38b9b94a98020bd26cdd25cd086ca
    },

};
