import axios from 'axios'

const apiUrl = 'https://felizabackend.de/api/'

const addCategory = async(category) => {
  
    try {
      const res = await axios.post(apiUrl + 'categories/add', category)
      if(res.status == 200) {
        return {success: true, data: res.data}
      }else {
        return {success: false, message: res.message}
      }
    } catch (error) {
       console.log(error.message);
    }
  }

  
const getAllCategories = async() => {
    try {
      const res = await axios.get(apiUrl + 'categories')
      if(res.status == 200) {
        return {success: true, data: res.data}
      } else {
        return {success: false}
      }
    } catch (error) {
      console.log(error.message);
    }
}


const deleteCategory = async(id) => {
    try {
        const res = await axios.delete(apiUrl + 'categories/delete' + id);
        return {success: true}
    } catch (error) {
        console.log(error.message);
    }
}

  
export {addCategory, getAllCategories, deleteCategory}