import axios from 'axios'

const baseUrl = 'https://felizabackend.uz/api/postFilial/'

const addPostFilial = async(postFilial) => {
    try {
      const token = localStorage.getItem('userToken');
      console.log(token);
      const res = await axios.post(baseUrl + 'addPostFilial', postFilial, {
           headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
      });
      if(res.status == 200 || res.status == 201) {
        return {success: true, data: res.data}
      }else {
        return {success: false, message: res.message}
      }
    } catch (error) {
       return {success: false, message: error.message}
    }
  }

  const getAllPostFilials = async() => {
    try {
      const res = await axios.get(baseUrl + 'getAllPostFilial')
      if(res.status == 200 || res.status == 201) {
        return {success: true, data: res.data}
      } else {
        return {success: false}
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const deletePostFilial = async(id) => {
    try {
      const token = localStorage.getItem('userToken');
      console.log(token);
      const res = await axios.delete(baseUrl + 'deletePostFilial/' + id, {
           headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
      });
        if(res.status == 200 || res.status == 204) {
          return {success: true, data: res.data}
        } else {
          return {success: false}
        }
    } catch (error) {
        return {success: false}
    }
}

  export {addPostFilial, getAllPostFilials, deletePostFilial}