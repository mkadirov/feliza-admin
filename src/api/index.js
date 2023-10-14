import axios from 'axios'

const apiUrl = 'https://felizabackend.de/api/'


const createProduct = async(data) => {
    try {
        const res = await axios.post(apiUrl + 'product', data)
        return{success: true, data: res.data}
    } catch (error) {
        return {success: false, message: error.message}
    }
}


export {createProduct}