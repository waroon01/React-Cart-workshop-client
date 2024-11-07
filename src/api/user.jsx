import axios from 'axios'

export const createUserCart = (token, cart)=>{

    return axios.post('http://localhost:5001/api/user/cart',cart,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const listUserCart = (token)=>{

    return axios.get('http://localhost:5001/api/user/cart',{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const saveAddress = (token, address)=>{

    return axios.post('http://localhost:5001/api/user/address',{address},{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}


export const saveOrder = (token, payLoad)=>{

    return axios.post('http://localhost:5001/api/user/order',{payLoad},{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}


export const getOrders = (token)=>{

    return axios.get('http://localhost:5001/api/user/order',{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}