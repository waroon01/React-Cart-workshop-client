import { useEffect, useState } from "react"
import useEcomStore from "../../Store/ecom-store"

const SearchCard = () => {
    const getProduct = useEcomStore((state)=>state.getProduct)
    const products = useEcomStore((state)=>state.products)
    const actionSearchFilters = useEcomStore((state)=>state.actionSearchFilters)

    const [text, setText] = useState('')
    useEffect(()=>{
        const delay = setTimeout(()=>{
            actionSearchFilters({ query: text })
            if(!text){
                getProduct()
            }
        },300)

        return ()=>clearTimeout(delay)    
    },[text])    

    // Step 1 Search Text
    console.log(text)
    
    
    // Step 2 Search by category

    
    // Step 3 Search by Price



  return (
    <div>
        <h1 className="text-xl font-bold mb-4">ค้นหาสินค้า</h1>
        <input 
            type="text" 
            className="rounded-md w-full mb-4 border px-2" 
            placeholder="ค้นหาสินค้า"
            onChange={(e)=>setText(e.target.value)}
        />
    </div>
  )
}

export default SearchCard