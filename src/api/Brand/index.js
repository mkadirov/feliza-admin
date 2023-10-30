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

const deleteBrand = async(id) => {
  try {
    const res = await axios.delete(apiUrl + 'brand/' + id);
    if(res.status == 200) {
      return {success: true, data: res.data}
    } else {
      return {success: false}
    }
  } catch (error) {
    return {success: false}
  }
}

const editBrand = async(id, brand) => {
  try {
    const res = await axios.put(apiUrl + 'brand/' + id, brand)
    if(res.status == 200) {
      return {success: true, data: res.data}
    } else {
      return {success: false}
    }
  } catch (error) {
    return {success: false}
  }
}

export {addBrend, getAllBrends, deleteBrand, editBrand}

