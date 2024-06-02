import axios from 'axios'

const apiUrl = 'https://felizabackend.uz/api/users/'


const addUser = async (userBody) => {
    try {
        const token = localStorage.getItem('userToken');
        console.log(token);
        const res = await axios.post(apiUrl + 'add', userBody, {
           headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        console.log(res);
        if(res.status == 200) {
            return {success: true, data: res.data}
        } else {
            return {success: false}
        }
    } catch (error) {
        console.log(error.message);
    }
}

const editUser = async (id, userDto) => {
    try {
        const token = localStorage.getItem('userToken');
        console.log(token);
        const res = await axios.put(apiUrl + 'editUser/' + id, userDto, {
           headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        console.log(res);
        if(res.status == 200) {
            return {success: true, data: res.data}
        } else {
            return {success: false}
        }
    } catch (error) {
        console.log(error.message);
    }
}

const getAllUsers = async() => {
    try {
        const res = await axios.get(apiUrl + 'geAllUser')
        if(res.status == 200) {
          return {success: true, data: res.data}
        } else {
          return {success: false}
        }
    } catch (error) {
        return {success: false}
    }
}

export {addUser, getAllUsers, editUser}
