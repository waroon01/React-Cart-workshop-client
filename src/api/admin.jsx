import axios from "axios";

export const getOrdersAdmin = (token) => {
  return axios.get("https://react-cart-workshop-server.vercel.app/api/admin/orders", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const changOrdersStatus = (token, orderId, orderStatus) => {
  return axios.put(
    "https://react-cart-workshop-server.vercel.app/api/admin/order-status",
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
    return axios.get("https://react-cart-workshop-server.vercel.app/api/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  export const changeUserStatus = (token, value) => {
    return axios.post("https://react-cart-workshop-server.vercel.app/api/change-status", value, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  export const changeUserRole = (token, value) => {
    return axios.post("https://react-cart-workshop-server.vercel.app/api/change-role", value, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };