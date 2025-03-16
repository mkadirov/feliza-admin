import axios from 'axios'

const apiUrl = 'https://felizabackend.uz/api/smallSlider/'

const getAllSmallSliderList = async() => {
    try {
      const token = localStorage.getItem("userToken");
      const res = await axios.get(apiUrl + 'getAllSmallSliders', {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      if(res.status == 200) {
        return {success: true, data: res.data}
      } else {
        return {success: false}
      }
    } catch (error) {
      console.log(error.message);
    }
}

const editSmallSliderById = async (id, categoryBlock) => {
    try {
      const token = localStorage.getItem("userToken");
      console.log(token);
      const res = await axios.put(apiUrl + "editSmallSlider/" + id, categoryBlock, {
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

  export {getAllSmallSliderList, editSmallSliderById}

