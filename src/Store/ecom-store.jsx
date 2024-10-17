import axios from 'axios';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'; //Local storage
import { listCategory } from '../api/Category';
import { listProduct } from '../api/Product';

const ecomStore = (set)=> ({
    user: null,
    token: null,
    categories: [],
    products: [],
    actionLogin: async(form)=>{
        const res = await axios.post('http://localhost:5001/api/login',form)
        // console.log(res.data.token)
        set({
            user: res.data.payload,
            token: res.data.token
        })

        return res

    },
    getCatagory : async(token)=>{
    
        try{
            const res = await listCategory(token)
            set({categories: res.data})
        }catch(err){
            console.log(err)
            
        }
    },
    getProduct : async(token, count)=>{
        try{
            const res = await listProduct(token, count)
            set({products: res.data})
        }catch(err){
            console.log(err)
            
        }
    }

})

// เตรียมค่าเพื่อใส่ localstorage เก็บไว้ 
const usePersist = {
    name: 'ecom-store',
    storage: createJSONStorage(()=>localStorage)
}

const useEcomStore = create(persist(ecomStore,usePersist))

export default useEcomStore