import axios from 'axios'

const apiUrl = 'https://felizabackend.de/api/'


const addColor = async (color) => {
    try {
        const token = localStorage.getItem('userToken');
        console.log(token);
        const res = await axios.post(apiUrl + 'color/addColor', color, {
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

const getAllColors = async() => {
    try {
        const res = await axios.get(apiUrl + 'color/getAllColors');
        if(res.status == 200) {
            return {success: true, data: res.data}
        }
    } catch (error) {
        console.log(error.message);
    }
}

const deleteColor = async(id) => {
    try {
        const token = localStorage.getItem('userToken');
        console.log(token);
        const res = await axios.delete(apiUrl + 'color/deleteColor/' + id, {
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
        
    }
}

const editColor = async(id, color) => {
    
    try {
        console.log(color);
        console.log(id);
        const token = localStorage.getItem('userToken');
        console.log(token);
        const res = await axios.put(apiUrl + 'color/deleteColor/' + id, color,  {
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
        return {success: false, message: error.message}
    }
}



export {addColor, getAllColors, deleteColor, editColor}