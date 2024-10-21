import { useEffect } from "react"
import ProductCard from "../components/card/ProductCard"
import useEcomStore from "../Store/ecom-store"
import SearchCard from "../components/card/SearchCard"

const Shop = () => {

  const getProduct = useEcomStore((state)=>state.getProduct)
  const products = useEcomStore((state)=>state.products)
  
  useEffect(()=>{
    getProduct()
  },[])

    // console.log(products)

  return (
    <div className="flex">
      
      {/* Search Bar */}
      <div className="w-1/4 p-4 bg-gray-100 h-screen">
        <SearchCard />
      </div>

      {/* Product */}
      <div className="w-1/2 p-4 h-screen overflow-y-auto">
        <p className="text-2xl font-bold mb-4">สินค้าทั้งหมด</p>
        <div className="flex flex-wrap gap-4">
          {/* product Card */}
          {
            products.map((item,index)=>
              <ProductCard key={index} item={item}/>
            )
          }

          
          {/* product Card */}
        </div>
      </div>    


      {/* Cart */}
      <div className="w-1/4 p-4 bg-gray-100 h-screen overflow-y-auto">
        Cart
      </div>








    </div>
  )
}

export default Shop
