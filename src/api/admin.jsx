import axios from "axios";

export const getOrdersAdmin = (token) => {
  return axios.get("http://localhost:5001/api/admin/orders", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const changOrdersStatus = (token, orderId, orderStatus) => {
  return axios.put(
    "http://localhost:5001/api/admin/order-status",
    {
      orderId,
      orderStatus,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getlistAllUser = (token) => {
    return axios.get("http://localhost:5001/api/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  export const changeUserStatus = (token, value) => {
    return axios.post("http://localhost:5001/api/change-status", value, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  export const changeUserRole = (token, value) => {
    return axios.post("http://localhost:5001/api/change-role", value, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };