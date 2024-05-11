import axios from 'axios'

const apiUrl = 'https://felizabackend.uz/api/'

const createCompatableProduct = async () => {
    try {
        const res = await axios.post(apiUrl + 'compatibleProduct');
        if(res.status == 200) {
            return {success: true, data: res.data}
        } else {
          return  {success: false}
        }
    } catch (error) {
        return {success: false}
    }
}

export {createCompatableProduct}