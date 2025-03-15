import axios from 'axios'

const apiUrl = 'https://felizabackend.uz/api/categoryBlock/'

const getAllCategoryBLocksList = async() => {
    try {
      const res = await axios.get(apiUrl + 'getAllCategoryBlocks')
      if(res.status == 200) {
        return {success: true, data: res.data}
      } else {
        return {success: false}
      }
    } catch (error) {
      console.log(error.message);
    }
}

const editCategoryBlockById = async (id, categoryBlock) => {
    try {
      const token = localStorage.getItem("userToken");
      console.log(token);
      const res = await axios.put(apiUrl + "editCategoryBlock/" + id, categoryBlock, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status == 200) {
        return { success: true, data: res.data };
      } else {
        return { success: false };
      }
    } catch (error) {
      console.log(error.message);
    }
  };

export {getAllCategoryBLocksList, editCategoryBlockById}