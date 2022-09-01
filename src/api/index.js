
import axios from 'axios'

import qs from 'qs'

axios.defaults.baseURL = process.env.VUE_APP_BASE_API; //填写域名
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default {
    async uploadPic(file) {
        const param = new FormData()
        param.append('file', file.file)
        param.append('name', file.name)
        param.append('size', file.size)
        // const url = `/upload2.php`
        const url = `/168.php/Uploadfile`
        return axios.post(url, param)
    },
    async getCannvas() {
        // const url = `/member/canvas.php?param=1`
        
        const url = `/168.php/Canvas/index`
        return axios.get(url)
    },
    async addCannvas(name, canvasData, canvasStyle, img, param = 'add') {
        // const url = `/member/canvas.php`
        const url = `/168.php/Canvas/addTemplate`
        const params = {
            name, canvasData, canvasStyle,img, param
        }
        return axios.post(url, qs.stringify(params))
    },
    async saveCannva(id, name, canvasData, canvasStyle,img, param='edit') {
        const url = `/168.php/Canvas/editTemplate`
        const params = {
            id, name, canvasData, canvasStyle, img, param
        }
        return axios.post(url, qs.stringify(params))
    }
}