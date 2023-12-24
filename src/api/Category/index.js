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
        const res = await axios.delete(apiUrl + 'categories/delete/' + id);
        if(res.status == 200) {
          return {success: true, data: res.data}
        } else {
          return {success: false}
        }
    } catch (error) {
        return {success: false}
    }
}

const editCategory = async(id, category) => {
  try {
    const res = await axios.put(apiUrl + 'categories/update/' + id, category);
    if(res.status == 200) {
      return {success: true, data: res.data}
    } else {
      return {success: false}
    }
  } catch (error) {
    return {success: false}
  }
}


const getParentCategory = async() => {
  try {
    const res = await axios.get(apiUrl + 'categories/getParentCategories')
    if(res.status == 200) {
      return {success: true, data: res.data}
    } else {
      return {success: false}
    }
  } catch (error) {
    return {success: false}
  }
}

const getSubCategories = async() => {
  try {
    const res = await axios.get(apiUrl + 'categories/getSubCategories')
    if(res.status == 200) {
      return {success: true, data: res.data}
    } else {
      return {success: false}
    }
  } catch (error) {
    return {success: false}
  }
}

  
export {addCategory, getAllCategories, deleteCategory, editCategory, getParentCategory, getSubCategories}