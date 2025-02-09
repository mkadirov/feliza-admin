import axios from "axios";

const apiUrl = "https://felizabackend.uz/api/customers/";

const getAllCustomers = async (pages) => {
    try {
        const token = localStorage.getItem('userToken');
        if (!token) {
            throw new Error("No token found");
        }

        const res = await axios.get(apiUrl + 'getAllCustomers', {
            params: {
                page: pages - 1,
                size: 15
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (res.status === 200) {
            return { success: true, data: res.data };
        } else {
            return { success: false };
        }
    } catch (error) {
        console.log("Error:", error.message);
        return { success: false, error: error.message };
    }
}

export { getAllCustomers };
