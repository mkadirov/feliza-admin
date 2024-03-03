import axios from 'axios'

const apiUrl = 'https://felizabackend.de/api/'

const addCategory = async(category) => {
    try {
      const token = localStorage.getItem('userToken');
      console.log(token);
      const res = await axios.post(apiUrl + 'categories/addCategory', category, {
           headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
      });
      if(res.status == 200) {
        return {success: true, data: res.data}
      }else {
        return {success: false, message: res.message}
      }
    } catch (error) {
       return {success: false, message: error.message}
    }
  }

  
const getAllCategories = async() => {
    try {
      const res = await axios.get(apiUrl + 'categories/getAllCategories')
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
      const token = localStorage.getItem('userToken');
      console.log(token);
      const res = await axios.delete(apiUrl + 'categories/deleteCategory/' + id, {
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
        return {success: false}
    }
}

const editCategory = async(id, category) => {
  try {
    const token = localStorage.getItem('userToken');
      console.log(token);
      console.log(category);
      const res = await axios.put(apiUrl + 'categories/editCategory/' + id, category, {
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

const getSubCategoriesByParent = async(parent) => {

  try {
    const res = await axios.get('https://felizabackend.de/api/categories/getSubCategoriesByParent/' + parent)
    if(res.status == 200) {
      return {success: true, data: res.data}
    } else {
      return {success: false}
    }
  } catch (error) {
    return {success: false}
  }
}

  
export {addCategory, getAllCategories, deleteCategory, editCategory, getParentCategory, getSubCategories, getSubCategoriesByParent}