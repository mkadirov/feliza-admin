import axios from "axios";

const apiUrl = "https://felizabackend.uz/api/notification";

const addNotificationToCustumer = async (cupon) => {
  try {
    const token = localStorage.getItem("userToken");
    console.log(token);
    const res = await axios.post(apiUrl + "/addNotificationToCustomer", cupon, {
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
const addNotificationToAll = async (data, selectedFile) => {
  const formData = new FormData();
  formData.append("addNotificationDto", JSON.stringify(data));
  formData.append("image", selectedFile);
  try {
    const token = localStorage.getItem("userToken");
    console.log(token);
    const res = await axios.post(apiUrl + "/addNotificationToAll", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
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

const getNotificationForCustumer = async (id) => {
  try {
    const res = await axios.get(apiUrl + "/getNotificationsForCustomer/" + id);
    if (res.status == 200) {
      return { success: true, data: res.data };
    } else {
      return { success: false };
    }
  } catch (error) {
    return { success: false };
  }
};

export {
  addNotificationToCustumer,
  getNotificationForCustumer,
  addNotificationToAll,
};
