import axios from "axios";

export const createCategory = (token, form)=>{

    return axios.post('https://react-cart-workshop-server.vercel.app/api/category',form,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const listCategory = ()=>{

    return axios.get('https://react-cart-workshop-server.vercel.app/api/category')
}

export const removeCategory = (token, id)=>{

    return axios.delete('https://react-cart-workshop-server.vercel.app/api/category/'+id,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}