import axios from "axios";


export const currenUser = async(token)=> await axios.post('https://react-cart-workshop-server.vercel.app/api/current-user',
    {},{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

export const currentAdmin = async(token)=>{
    return await axios.post('https://react-cart-workshop-server.vercel.app/api/current-admin',
    {},{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}