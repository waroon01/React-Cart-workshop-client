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

export const readProduct = (token, id)=>{

    return axios.get('http://localhost:5001/api/product/'+id,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}


export const updateProduct = (token, id, form)=>{

    return axios.put('http://localhost:5001/api/product/'+id, form,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}


export const uploadFiles = (token, form)=>{
    // console.log(form)

    return axios.post('http://localhost:5001/api/images',{
        image: form
    },{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}


export const removeFiles = (token, public_id)=>{

    return axios.post('http://localhost:5001/api/removeimages',{
        public_id
    },{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

