import axios from 'axios'

const apiUrl = 'https://felizabackend.uz/api/role'

const getRoles =  async () => {
    try {
        const res = await axios.get(apiUrl);

        if(res?.status == 200) {
            return {success: true, data: res.data}
        } else {
            return {success: false}
        }
    } catch (error) {
        return {success: false}
    }
}

export {getRoles}