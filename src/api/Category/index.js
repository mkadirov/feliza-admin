import axios from 'axios'

const apiUrl = 'https://felizabackend.uz/api/'

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

const editCategory = async (id, category, image, verticalImage) => {
  const formData = new FormData();
  console.log("Image:", image);
  console.log("Vertical Image:", verticalImage);

  // Agar image file bo'lsa, formData'ga qo'shish
  if (image instanceof File) {
    formData.append("horizontal", image);
  }
  // Agar verticalImage file bo'lsa, formData'ga qo'shish
  if (verticalImage instanceof File) {
    formData.append("vertical", verticalImage);
  }

  // Kategoriyani JSON formatga o'tkazish
  formData.append("editCategoryDto", JSON.stringify(category));

  try {
    const token = localStorage.getItem('userToken');

    const res = await axios.put(`${apiUrl}categories/editCategory/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      },
    });

    if (res.status === 200) {
      return { success: true, data: res.data };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error('Error during API call:', error);
    return { success: false };
  }
};



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
    const res = await axios.get( apiUrl + 'categories/getSubCategoriesByParent/' + parent)
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