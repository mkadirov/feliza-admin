import axios from 'axios'

const apiUrl = 'https://felizabackend.de/api/'


const createProduct = async(product, imageFiles) => {

    const formData = new FormData();
    imageFiles.forEach((file, index) => {
        formData.append(`files[${index}]`, file);
    });
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


export {createProduct}