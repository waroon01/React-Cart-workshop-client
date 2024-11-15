import axios from 'axios'

export const createUserCart = (token, cart)=>{

    return axios.post('https://react-cart-workshop-server.vercel.app/api/user/cart',cart,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const listUserCart = (token)=>{

    return axios.get('https://react-cart-workshop-server.vercel.app/api/user/cart',{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const saveAddress = (token, address)=>{

    return axios.post('https://react-cart-workshop-server.vercel.app/api/user/address',{address},{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}


export const saveOrder = (token, payLoad)=>{

    return axios.post('https://react-cart-workshop-server.vercel.app/api/user/order',{payLoad},{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}


export const getOrders = (token)=>{

    return axios.get('https://react-cart-workshop-server.vercel.app/api/user/order',{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}