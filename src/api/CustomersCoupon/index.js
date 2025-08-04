import axios from "axios";

const apiUrl = "https://felizabackend.uz";

const addCuponCustomer = async (cupon) => {
  try {
    const token = localStorage.getItem("userToken");
    console.log(token);
    const res = await axios.post(
      apiUrl + "/api/couponCustomer/addCouponToCustomer",
      cupon,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.status == 200) {
      return { success: true, data: res.data };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.log(error.message);
  }
};

const editCuponCustomer = async (id, cupon) => {
  try {
    const token = localStorage.getItem("userToken");
    console.log(token);
    const res = await axios.put(apiUrl + "/coupon/editCoupon/" + id, cupon, {
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

const getCuponNamesCustomer = async (string) => {
  try {
    const token = localStorage.getItem("userToken");
    const res = await axios.get(
      apiUrl + "/api/coupon/getCouponByName/" + string,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res?.status == 200) {
      return { success: true, data: res.data };
    } else {
      return { success: false };
    }
  } catch (error) {
    return { success: false };
  }
};
const getCustomerByTel = async (nomer) => {
  try {
    const token = localStorage.getItem("userToken");
    const res = await axios.get(
      apiUrl + "/api/customers/getCustomerByPhoneNumber/" + nomer,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res?.status == 200) {
      return { success: true, data: res.data };
    } else {
      return { success: false };
    }
  } catch (error) {
    return { success: false };
  }
};

const getAllCuponsCustomer = async (id) => {
  try {
    const token = localStorage.getItem("userToken");
    const res = await axios.get(
      apiUrl + "/api/couponCustomer/getCouponsByCustomerId/" + id,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res?.status == 200) {
      return { success: true, data: res.data };
    } else {
      return { success: false };
    }
  } catch (error) {
    return { success: false };
  }
};

const deleteCouponCustomer = async (id) => {
  try {
    const token = localStorage.getItem("userToken");
    const res = await axios.delete(apiUrl + "/api/coupon/deleteCoupon/" + id, {
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

export {
  getCustomerByTel,
  addCuponCustomer,
  getCuponNamesCustomer,
  getAllCuponsCustomer,
  editCuponCustomer,
  deleteCouponCustomer,
};
