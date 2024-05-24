import axios from "axios";

const apiUrl = "https://felizabackend.uz/api/coupon/";

const addCupon = async (cupon) => {
  try {
    const token = localStorage.getItem("userToken");
    console.log(token);
    const res = await axios.post(apiUrl + "addCoupon", cupon, {
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

const editCupon = async (cupon, id) => {
    try {
      const token = localStorage.getItem("userToken");
      console.log(token);
      const res = await axios.post(apiUrl + "editCoupon/" + id, cupon, {
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

const getCuponNames = async () => {
  try {
    const res = await axios.get(apiUrl + "enums/couponNames");

    if (res?.status == 200) {
      return { success: true, data: res.data };
    } else {
      return { success: false };
    }
  } catch (error) {
    return {success: false}
  }
};

const getAllCupons = async () => {
    try {
      const res = await axios.get(apiUrl + "getAllCoupons");
  
      if (res?.status == 200) {
        return { success: true, data: res.data };
      } else {
        return { success: false };
      }
    } catch (error) {
      return {success: false}
    }
  };

export { addCupon, getCuponNames, getAllCupons, editCupon};
