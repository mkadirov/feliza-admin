import axios from 'axios'

const apiUrl = 'https://felizabackend.de/api/product/'


const createProduct = async(product, imageFiles) => {

    const formData = new FormData();
   
    for (let i = 0; i < imageFiles.length; i++) {
        formData.append('files', imageFiles[i]);
    }
   
    formData.append('productDto', JSON.stringify(product));

    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.post(apiUrl + 'addProduct', formData, {
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


const getAllProducts = async() => {
    try {
        const res = await axios.get(apiUrl + 'getAllProducts')
        return {success: true, data: res.data}
    } catch (error) {
        return {success: false}
    }
}


const deleteProduct = async(id) => {
  try {
    const token = localStorage.getItem('userToken');
    console.log(token);
    const res = await axios.delete(apiUrl + 'deleteProduct/' + id, {
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

const getProductByID = async(id) => {
  try {
      const res = await axios.get(apiUrl + 'getProductById/' + id);
      if(res.status == 200) {
          return {success: true, data: res.data}
          
      } else {
          return {success: false}
      }
  } catch (error) {
      return {success: false}
  }
}

const getProductByRefNumber = async(refNumber) => {
  try {
    const res = await axios.get(apiUrl + 'getProductsByReferenceNumber/' + refNumber);
    if(res.status == 200) {
        return {success: true, data: res.data}
        
    } else {
        return {success: false, message: 'res Error'}
    }
  } catch (error) {
      return {success: false, message: error}
  }
}




export {createProduct, getAllProducts, deleteProduct, getProductByID, getProductByRefNumber}