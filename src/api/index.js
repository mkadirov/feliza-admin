import axios from 'axios'

const apiUrl = 'https://felizabackend.de/api/'


const createProduct = async(product, imageFiles) => {

    const formData = new FormData();
    let images = [];
    imageFiles.map((file, index) => {
        // formData.append(`files[${index}]`, file);
        images.push(file)
    });
    formData.append('files', images)
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


export {createProduct, getAllProducts}