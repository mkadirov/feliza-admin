import axios from 'axios'

const apiUrl = 'https://felizabackend.uz/api/lookCollection/'

const addLookCollection = async(files, item) => {
    const formData = new FormData();
   
    for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
    }
    
    formData.append('productIds', JSON.stringify(item));
    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.post(apiUrl + 'addLookCollection', formData, {
        headers: {
           'Content-Type': 'multipart/form-data',
           'Authorization': `Bearer ${token}`
        },
      });
      console.log('Response from server:', response.data);
      if(response.status == 200) {
        return {success: true, data: response.data}
      }else {
        return {success: false, message: response.message}
      }
    } catch (error) {
      
      return {success: false, message: error}
    }
}

const getAllCollections = async() => {
  try {
      const res = await axios.get(apiUrl + 'getLookCollection')
      if(res.status == 200) {
        return {success: true, data: res.data}
      } else {
        return {success: false, message: 'res Error'}
      }
  } catch (error) {
      return {success: false, message: error}
  }
}

const getLookCollectionByID = async (id) => {
  try {
    const res = await axios.get(apiUrl + 'getLookCollectionById/' + id);
    if(res.status == 200) {
      return {success: true, data: res.data}
    } else {
      return {success: false, message: 'res Error'}
    }
  } catch (error) {
    return {success: false, message: error}
  }
}

export {addLookCollection, getAllCollections, getLookCollectionByID}