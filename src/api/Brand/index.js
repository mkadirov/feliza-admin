import axios from 'axios'

const apiUrl = 'https://felizabackend.de/api/'


const addBrend = async(brend) => {
    try {
      const res = await axios.post(apiUrl + 'brand/add', brend)
      if(res.status == 200) {
        return {success: true, data: res.data}
      } else {
        return {success: false}
      }
    } catch (error) {
      console.log(error.message);
    }
}

const getAllBrends = async() => {
    try {
        const res = await axios.get(apiUrl + 'brand');
        if(res.status == 200) {
            return {success: true, data: res.data}
        }
    } catch (error) {
        console.log(error.message);
    }
}

export {addBrend, getAllBrends}

