import axios from 'axios'

const apiUrl = 'https://felizabackend.de/api/region/'
const subRegionUrl = 'https://felizabackend.de/api/subRegion/'

const addNewRegion = async(region) => {
    try {
      const token = localStorage.getItem('userToken');
      console.log(token);
      const res = await axios.post(apiUrl + 'addRegion', region, {
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


  const addNewSubRegion = async(region) => {
    try {
      const token = localStorage.getItem('userToken');
      console.log(token);
      const res = await axios.post(subRegionUrl + 'addSubRegion', region, {
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

  
const getAllRegions = async() => {
    try {
      const res = await axios.get(apiUrl + 'getAllRegions')
      if(res.status == 200) {
        return {success: true, data: res.data}
      } else {
        return {success: false}
      }
    } catch (error) {
      console.log(error.message);
    }
}


const deleteRegion = async(id) => {
    try {
      const token = localStorage.getItem('userToken');
      console.log(token);
      const res = await axios.delete(apiUrl + 'deleteRegion/' + id, {
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

const editRegion = async(id, region) => {
  try {
    const token = localStorage.getItem('userToken');
      console.log(token);
      const res = await axios.put(apiUrl + 'editRegion/' + id, region, {
           headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
      });
    if(res.status == 200 || res.status == 201) {
      return {success: true, data: res.data}
    } else {
      return {success: false}
    }
  } catch (error) {
    return {success: false}
  }
}


const getParentRegionById = async(id) => {
  try {
    const res = await axios.get(apiUrl + 'getRegionById/' + id)
    if(res.status == 200) {
      return {success: true, data: res.data}
    } else {
      return {success: false}
    }
  } catch (error) {
    return {success: false}
  }
}

const getSubRegions = async() => {
  try {
    const res = await axios.get(subRegionUrl + 'getAllSubRegions')
    if(res.status == 200) {
      return {success: true, data: res.data}
    } else {
      return {success: false}
    }
  } catch (error) {
    return {success: false}
  }
}

const deleteSubRegion = async(id) => {
  try {
    const token = localStorage.getItem('userToken');
    console.log(token);
    const res = await axios.delete(subRegionUrl + 'deleteSubRegion/' + id, {
         headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
    });
      if(res.status == 200 || res.status == 201) {
        return {success: true, data: res.data}
      } else {
        return {success: false}
      }
  } catch (error) {
      return {success: false}
  }
}

const editSubRegion = async(id, region) => {
  try {
    const token = localStorage.getItem('userToken');
      console.log(token);
      const res = await axios.put(subRegionUrl + 'editRegion/' + id, region, {
           headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
      });
    if(res.status == 200 || res.status == 201) {
      return {success: true, data: res.data}
    } else {
      return {success: false}
    }
  } catch (error) {
    return {success: false}
  }
}

const getSubRegionsByParent = async(parent) => {

  try {
    const res = await axios.get(subRegionUrl + 'getSubRegionsByRegionId/' + parent)
    if(res.status == 200) {
      return {success: true, data: res.data}
    } else {
      return {success: false}
    }
  } catch (error) {
    return {success: false}
  }
}

  
export {addNewRegion, getAllRegions, deleteRegion, editRegion, getParentRegionById, 
  getSubRegions, getSubRegionsByParent, addNewSubRegion, deleteSubRegion, editSubRegion}