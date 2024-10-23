import axios from 'axios'

export const createUserCart = (token, cart)=>{

    return axios.post('http://localhost:5001/api/user/cart',cart,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}