import { useState,useEffect } from "react"
import { createCategory, listCategory, removeCategory } from "../../api/Category"
import useEcomStore from "../../Store/ecom-store"
import { toast } from "react-toastify"

const FormCategory = () => {
const token = useEcomStore((state)=>state.token)
const [ name, setName ] = useState("")
const [ categories, setCategories ] = useState([])

useEffect(()=>{
    getCatagory(token)
},[])

const handleRemove = async(id)=>{
    console.log(id)
    try{
        const res = await removeCategory(token, id)
        console.log(res)
        toast.success(`Deleted ${res.data.name}`)
        getCatagory(token)
    }catch(err){
        console.log(err)
    }
}


const getCatagory = async(token)=>{
    
    try{
        const res = await listCategory(token)
        setCategories(res.data)
        console.log(categories)
    }catch(err){
        console.log(err)
        
    }
}



// console.log(name)
const handleSubmit = async(e)=>{
    e.preventDefault()

    // console.log({name})
    if(!name){
        return toast.warning('Plese fill data')
    }
    try{
            const res = await createCategory(token, {name})  
            console.log(res)
            toast.success(`Add Catagory ${res.data.name} success!!!`)
            setName("");
            getCatagory(token)
    }catch(err){
        console.log(err)
    }
}

  return (
    <div className="container mx-auto p-4 bg-white shadow-md">
        <h1>Category Management</h1>
        <form className="my-4" onSubmit={handleSubmit}>
            <input 
                type="text" 
                name="" 
                className="border" 
                value={name}
                onChange={(e)=>setName(e.target.value)}
            />
            <button className="bg-blue-500 text-yellow-300">Add Catagory</button>
        </form>

        <hr />

        <ul className="list-none">
            {
                categories.map((item, index)=>
                    <li 
                        className="flex justify-between my-2"
                        key={index}>
                            <span>
                                { item.name }
                            </span>
                        <button 
                            onClick={()=>handleRemove(item.id)}
                            className="text-white bg-red-500 w-6 shadow-md"
                        >X</button>
                    </li>
                )
            }
        </ul>


    </div>
  )
}

export default FormCategory
