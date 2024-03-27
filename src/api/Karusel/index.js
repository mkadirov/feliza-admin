import axios from 'axios'

const apiUrl = 'https://felizabackend.de/api/karusel/'


const createKarusel = async(item, image) => {

    const formData = new FormData();

    formData.append('file', image);
    formData.append('karuselDto', JSON.stringify(item));
    console.log(formData);

    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.post(apiUrl + 'addKarusel', formData, {
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

export {createKarusel}
