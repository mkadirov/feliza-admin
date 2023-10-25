import axios from 'axios'

const apiUrl = 'https://felizabackend.de/api/'


const createProduct = async(product, imageFiles) => {

    const formData = new FormData();
   
    for (let i = 0; i < imageFiles.length; i++) {
        formData.append('files', imageFiles[i]);
    }
   
    formData.append('productDto', JSON.stringify(product));

    try {
      const response = await axios.post(apiUrl + 'product/add', formData, {
        headers: {
           'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Response from server:', response.data);
    } catch (error) {
      console.error('Error sending the request:', error);
    }
}


const getAllProducts = async() => {
    try {
        const res = await axios.get(apiUrl + 'product')
        return {success: true, data: res.data}
    } catch (error) {
        return {success: false}
    }
}


const addCategory = async(category) => {
  const formData = new FormData();
  console.log(category);
  formData.append('category', category)
  try {
    const res = await axios(apiUrl + 'categories/add', formData)
    return {success: true, data: res.data}
  } catch (error) {
    return {success: false}
  }
}

const addBrend = async(brend) => {
  try {
    const res = await axios(apiUrl + 'brends/add', brend)
    return {success: true, data: res.data}
  } catch (error) {
    return {success: false}
  }
}


export {createProduct, getAllProducts, addCategory, addBrend}