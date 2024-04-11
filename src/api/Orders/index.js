import axios from 'axios'

const baseUrl = 'https://felizabackend.de/api/order/'

const getNewOrders = async() => {
    try {
        const token = localStorage.getItem('userToken');
        const res = await axios.get(baseUrl + 'getNewOrders', {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
        });
        if(res.status == 200) {
            return {success: true, data: res.data}
        }
    } catch (error) {
        console.log(error.message);
    }
}

const getOrderById = async(id) => {
    try {
        const token = localStorage.getItem('userToken');
        console.log(token);
        const res = await axios.get(baseUrl + 'getOrderById/' + id, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
        });
        if(res.status == 200) {
            return {success: true, data: res.data}
        }else {
            return {success: false}
        }
    } catch (error) {
        return {success: false}
    }
}

export { getNewOrders, getOrderById}