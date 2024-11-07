import axios from "axios";

export const createProduct = (token, form) => {
  return axios.post("http://localhost:5001/api/product", form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const listProduct = (count = 20) => {
  return axios.get("http://localhost:5001/api/products/" + count);
};

export const readProduct = (token, id) => {
  return axios.get("http://localhost:5001/api/product/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteProduct = (token, id) => {
  return axios.delete("http://localhost:5001/api/product/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateProduct = (token, id, form) => {
  return axios.put("http://localhost:5001/api/product/" + id, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const uploadFiles = (token, form) => {
  // console.log(form)

  return axios.post(
    "http://localhost:5001/api/images",
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
    "http://localhost:5001/api/removeimages",
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
  return axios.post("http://localhost:5001/api/search/filters", arg);
};

export const listProductBy = (sort, order, limit) => {
  return axios.post("http://localhost:5001/api/productby", {
    sort: sort,
    order: order,
    limit,
  });
};
