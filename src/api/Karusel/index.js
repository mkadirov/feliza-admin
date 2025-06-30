import axios from 'axios'

const apiUrl = 'https://felizabackend.uz/api/karusel/'

const createKarusel = async(imagesData, karuselSlide) => {
    const formData = new FormData();

      // Mobil rasmlarni qo‘shish
  for (let i = 0; i < imagesData.mobile.length; i++) {
    formData.append('mobileImage', imagesData.mobile[i]);
  }

  // Desktop rasmlarni qo‘shish
  for (let i = 0; i < imagesData.desktop.length; i++) {
    formData.append('desktopImage', imagesData.desktop[i]);
  }

    formData.append('karuselDto', JSON.stringify(karuselSlide));
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

const getAllKaruselSlides = async() => {
  try {
      const res = await axios.get(apiUrl + 'getAllKarusels')
      if(res.status == 200) {
        return {success: true, data: res.data}
      } else {
        return {success: false}
      }
  } catch (error) {
      return {success: false}
  }
}


const deleteKaruselSlideByID = async(id) => {
  try {
    const token = localStorage.getItem('userToken');
    const res = await axios.delete(apiUrl + 'deleteKarusel/' + id, {
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

export {createKarusel, getAllKaruselSlides, deleteKaruselSlideByID}
