import axios from 'axios'

const apiUrl = 'https://felizabackend.de/api/'


const createProduct = async(data) => {
    try {
        const res = await axios.post(apiUrl + 'product/add', data)
        return res.success? {success: true, data: res.data, message: res.message} : {success: false, data: res.data, message: res.message}
    } catch (error) {
        return {success: false, message: error.message}
    }
}


export {createProduct}