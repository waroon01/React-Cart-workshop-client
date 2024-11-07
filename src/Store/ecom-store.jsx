import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware"; //Local storage
import { listCategory } from "../api/Category";
import { listProduct, searchFilters } from "../api/Product";
import _ from "lodash";

const ecomStore = (set, get) => ({
  user: null,
  token: null,
  categories: [],
  products: [],
  carts: [],
  logout: ()=>{
    set({
      user: null,
      token: null,
      categories: [],
      products: [],
      carts: [],      
    })
  },
  actionAddtoCart: (product) => {
    const carts = get().carts;
    const updateCart = [...carts, { ...product, count: 1 }];

    // step Uniqe
    const uniqe = _.unionWith(updateCart, _.isEqual);
    set({ carts: uniqe });
  },
//   update จำนวนสินค้าในตะกร้า ปุ่ม + -
  actionUpdateQuantity: (productId, newQuantity) => {
    // console.log('update click', productId, newQuantity)
    set((state) => ({
      carts: state.carts.map((item) =>
        item.id === productId
          ? { ...item, count: Math.max(1, newQuantity) } //ใช้ Math.max เพื่อไม่ให้ค่าจำนวนต่ำกว่า 1
          : item
      ),
    }));
  },
//   ลบสินค้าจาก ตะกร้า
  actionRemoveProduct: (productId) => {
    // console.log(productId)
    set((state) => ({
      carts: state.carts.filter((item) => item.id !== productId),
    }));
  },
  getTotalPrice: ()=>{
    return get().carts.reduce((total, item)=>{
        return total + item.price * item.count
    },0)
  },
  actionLogin: async (form) => {
    const res = await axios.post("http://localhost:5001/api/login", form);
    // console.log(res.data.token)
    set({
      user: res.data.payload,
      token: res.data.token,
    });

    return res;
  },
  getCatagory: async () => {
    try {
      const res = await listCategory();
      set({ categories: res.data });
    } catch (err) {
      console.log(err);
    }
  },
  getProduct: async (count) => {
    try {
      const res = await listProduct(count);
      set({ products: res.data });
    } catch (err) {
      console.log(err);
    }
  },
  actionSearchFilters: async (arg) => {
    try {
      const res = await searchFilters(arg);
      set({ products: res.data });
    } catch (err) {
      console.log(err);
    }
  },
  clearCart: ()=> set({carts: []}),
});

// เตรียมค่าเพื่อใส่ localstorage เก็บไว้
const usePersist = {
  name: "ecom-store",
  storage: createJSONStorage(() => localStorage),
};

const useEcomStore = create(persist(ecomStore, usePersist));

export default useEcomStore;
