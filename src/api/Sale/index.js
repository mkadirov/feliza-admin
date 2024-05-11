import axios from 'axios'

const apiUrl = 'https://felizabackend.uz/api/saleGroup/'

const addSaleProduct = async(saleProduct) => {
    try {
      const token = localStorage.getItem('userToken');
      console.log(token);
      const res = await axios.post(apiUrl + 'addSaleGroup', saleProduct, {
           headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
      });
      if(res.status == 200) {
        return {success: true, data: res.data}
      }else {
        return {success: false, message: res.message}
      }
    } catch (error) {
       return {success: false, message: error.message}
    }
  }

const getAllSaleGroups = async() => {
    try {
        const res = await axios.get(apiUrl + 'getAllSaleGroups')
        if(res.status == 200) {
          return {success: true, data: res.data}
        } else {
          return {success: false}
        }
    } catch (error) {
        return {success: false}
    }
}

const deleteSaleGroupByID = async(id) => {
  try {
    const token = localStorage.getItem('userToken');
    const res = await axios.delete(apiUrl + 'removeSaleGroup/' + id, {
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

export {addSaleProduct, getAllSaleGroups, deleteSaleGroupByID}