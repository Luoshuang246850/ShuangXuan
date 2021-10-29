import axios from 'axios'

<<<<<<< HEAD
axios.defaults.withCredentials = true;
axios.defaults.timeout = 60000;
axios.defaults.headers.post['Content-Type'] = 'application/json';



export default {
    // get请求
    requestGet(url,params = {}) {
		url=url+'?value='+window.localStorage.getItem('value')
=======


axios.defaults.withCredentials = true;
axios.defaults.timeout = 60000;
axios.defaults.headers.post['Content-Type'] = 'application/json'

export default {
    // get请求
    requestGet(url, params = {}) {
>>>>>>> 9c64dd2a89f38b9b94a98020bd26cdd25cd086ca
        return new Promise((resolve, reject) => {
            axios.get(url, params).then(res => {
                resolve(res.data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // post请求
    requestPost(url, params = {}) {
<<<<<<< HEAD
		url=url+'?value='+window.localStorage.getItem('value')
=======
>>>>>>> 9c64dd2a89f38b9b94a98020bd26cdd25cd086ca
        return new Promise((resolve, reject) => {
            axios.post(url, params).then(res => {
                resolve(res.data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // delete请求
    requestDelete(url, params = {}) {
<<<<<<< HEAD
		url=url+'?value='+window.localStorage.getItem('value')
=======
>>>>>>> 9c64dd2a89f38b9b94a98020bd26cdd25cd086ca
        return new Promise((resolve, reject) => {
            axios.delete(url, params).then(res => {
                resolve(res.data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // put请求
    requestPut(url, params = {}) {
<<<<<<< HEAD
		url=url+'?value='+window.localStorage.getItem('value')
=======
>>>>>>> 9c64dd2a89f38b9b94a98020bd26cdd25cd086ca
        return new Promise((resolve, reject) => {
            axios.put(url, params).then(res => {
                resolve(res.data)
            }).catch(error => {
                reject(error)
            })
        })
    }

}
