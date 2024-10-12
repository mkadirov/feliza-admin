import axios from "axios";

const apiUrl = "https://felizabackend.uz/api/customers/";

const getAllCustomers = async (pages) => {
    try {
        const token = localStorage.getItem('userToken');
        console.log(token);
        const res = await axios.get(apiUrl + 'getAllCustomers', {
            params: {
                page: pages-1,
                size: 15
            },
        });
        if(res.status == 200) {
            return {success: true, data: res.data}
        } else {
            return {success: false}
        }
    } catch (error) {
        console.log(error.message);
    }
}

export {getAllCustomers}