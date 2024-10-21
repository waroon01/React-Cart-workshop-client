import axios from "axios";

export const createCategory = (token, form)=>{

    return axios.post('http://localhost:5001/api/category',form,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const listCategory = ()=>{

    return axios.get('http://localhost:5001/api/category')
}

export const removeCategory = (token, id)=>{

    return axios.delete('http://localhost:5001/api/category/'+id,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}