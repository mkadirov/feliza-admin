import axios from 'axios'

const apiUrl = 'https://felizabackend.de/api/'


const createProduct = async(data) => {
    try {
        const res = await axios.post(apiUrl + 'product/add', data)
        return  res.message
    } catch (error) {
        return error.message
    }
}


export {createProduct}