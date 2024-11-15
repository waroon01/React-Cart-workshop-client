import axios from "axios";

export const createProduct = (token, form) => {
  return axios.post("https://react-cart-workshop-server.vercel.app/api/product", form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const listProduct = (count = 20) => {
  return axios.get("https://react-cart-workshop-server.vercel.app/api/products/" + count);
};

export const readProduct = (token, id) => {
  return axios.get("https://react-cart-workshop-server.vercel.app/api/product/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteProduct = (token, id) => {
  return axios.delete("https://react-cart-workshop-server.vercel.app/api/product/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateProduct = (token, id, form) => {
  return axios.put("https://react-cart-workshop-server.vercel.app/api/product/" + id, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const uploadFiles = (token, form) => {
  // console.log(form)

  return axios.post(
    "https://react-cart-workshop-server.vercel.app/api/images",
    {
      image: form,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const removeFiles = (token, public_id) => {
  return axios.post(
    "https://react-cart-workshop-server.vercel.app/api/removeimages",
    {
      public_id,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const searchFilters = (arg) => {
  return axios.post("https://react-cart-workshop-server.vercel.app/api/search/filters", arg);
};

export const listProductBy = (sort, order, limit) => {
  return axios.post("https://react-cart-workshop-server.vercel.app/api/productby", {
    sort: sort,
    order: order,
    limit,
  });
};
