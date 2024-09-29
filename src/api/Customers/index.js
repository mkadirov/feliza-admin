import axios from "axios";

const apiUrl = "https://felizabackend.uz/api/customers/";

const getAllCustomers = async () => {
    try {
        const token = localStorage.getItem('userToken');
        console.log(token);
        const res = await axios.get(apiUrl + 'getAllCustomers', {
           headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
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