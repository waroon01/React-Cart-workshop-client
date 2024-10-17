import axios from 'axios'

export const createProduct = (token, form)=>{

    return axios.post('http://localhost:5001/api/product',form,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const listProduct = (token, count = 20)=>{

    return axios.get('http://localhost:5001/api/products/'+count,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}