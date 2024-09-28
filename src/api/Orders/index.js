import axios from "axios";

const baseUrl = "https://felizabackend.uz/api/order/";

const getAllOrders = async () => {
  try {
    const token = localStorage.getItem("userToken");
    const res = await axios.get(baseUrl + "getAllOrders", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status == 200) {
      return { success: true, data: res.data };
    }
  } catch (error) {
    console.log(error.message);
  }
};

const getAllPaidOrders = async () => {
  try {
    const token = localStorage.getItem("userToken");
    const res = await axios.get(baseUrl + "getAllOrdersPaidIsTrue", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status == 200) {
      return { success: true, data: res.data };
    }
  } catch (error) {
    console.log(error.message);
  }
};

const getAllDeliveredOrders = async () => {
  try {
    const token = localStorage.getItem("userToken");
    const res = await axios.get(baseUrl + "getReachedOrders", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status == 200) {
      return { success: true, data: res.data };
    }
  } catch (error) {
    console.log(error.message);
  }
};

const getNewOrders = async () => {
  try {
    const token = localStorage.getItem("userToken");
    const res = await axios.get(baseUrl + "getNewOrders", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status == 200) {
      return { success: true, data: res.data };
    }
  } catch (error) {
    console.log(error.message);
  }
};

const getCanceledOrders = async () => {
  try {
    const token = localStorage.getItem("userToken");
    const res = await axios.get(baseUrl + "getRejectedOrders", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status == 200) {
      return { success: true, data: res.data };
    }
  } catch (error) {
    console.log(error.message);
  }
};

const getShippedOrders = async () => {
  try {
    const token = localStorage.getItem("userToken");
    const res = await axios.get(baseUrl + "getSendOrders", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status == 200) {
      return { success: true, data: res.data };
    }
  } catch (error) {
    console.log(error.message);
  }
};

const getPackagedOrders = async () => {
  try {
    const token = localStorage.getItem("userToken");
    const res = await axios.get(baseUrl + "getPackOrders", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status == 200) {
      return { success: true, data: res.data };
    }
  } catch (error) {
    console.log(error.message);
  }
};

const getOrderById = async (id) => {
  try {
    const token = localStorage.getItem("userToken");
    console.log(token);
    const res = await axios.get(baseUrl + "getOrderById/" + id, {
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

const orderPackedUp = async (id) => {
  try {
    const token = localStorage.getItem("userToken");
    console.log(token);
    const res = await axios.put(baseUrl + "editStatusToPack/" + id, {
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

const cancelOrder = async (id) => {
  try {
    const token = localStorage.getItem("userToken");
    const res = await axios.put(baseUrl + "editStatusToRejected/" + id, {
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

const setOrderStatusToDelivered = async (id) => {
  try {
    const token = localStorage.getItem("userToken");
    const res = await axios.put(baseUrl + "editStatusToReached/" + id, {
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

const sendOrder = async (id, trackingNumber) => {
  const postNumber = {
    postTrackingNumber: trackingNumber,
  };

  try {
    const token = localStorage.getItem("userToken");
    const res = await axios.put(
      baseUrl + "editStatusToSend/" + id,
      postNumber,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.status === 200) {
      return { success: true, data: res.data };
    } else {
      return { success: false };
    }
  } catch (error) {
    return { success: false };
  }
};

export {
  getNewOrders,
  getOrderById,
  orderPackedUp,
  cancelOrder,
  getCanceledOrders,
  getPackagedOrders,
  getShippedOrders,
  sendOrder,
  getAllPaidOrders,
  getAllOrders,
  getAllDeliveredOrders,
  setOrderStatusToDelivered,
};
