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

const editCupon = async (enumName, cupon) => {
  try {
    const token = localStorage.getItem("userToken");
    console.log(token);
    const res = await axios.put(apiUrl + "editCoupon/" + enumName, cupon, {
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

const getCuponNames = async (string) => {
  try {
    const token = localStorage.getItem("userToken");
    const res = await axios.get(apiUrl + "enums/couponNames", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (res?.status == 200) {
      return { success: true, data: res.data };
    } else {
      return { success: false };
    }
  } catch (error) {
    return { success: false };
  }
};

const getAllCupons = async () => {
  try {
    const token = localStorage.getItem("userToken");
    const res = await axios.get(apiUrl + "getAllCoupons", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (res?.status == 200) {
      return { success: true, data: res.data };
    } else {
      return { success: false };
    }
  } catch (error) {
    return { success: false };
  }
};

const deleteCoupon = async (id) => {
  try {
    const token = localStorage.getItem("userToken");
    const res = await axios.delete(apiUrl + "deleteCoupon/" + id, {
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
    return { success: false };
  }
};

export { addCupon, getCuponNames, getAllCupons, editCupon, deleteCoupon };
