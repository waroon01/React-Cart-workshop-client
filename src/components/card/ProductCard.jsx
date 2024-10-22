import { ShoppingCart } from 'lucide-react';
import useEcomStore from '../../Store/ecom-store';


const ProductCard = ({item}) => {
    const carts = useEcomStore((state)=>state.carts)
    const actionAddtoCart = useEcomStore((state)=>state.actionAddtoCart)


  return (
    <div className="border rounded-lg shadow-md p-2 w-48">
        
        <div className="">
            {
                item.images && item.images.length > 0
                ? <img src={item.images[0].url} className='rounded-md w-full h-24 
                   object-cover hover:scale-110 hover:duration-200' />
                : <div className="w-full h-24 bg-gray-200 rounded-lg text-center items-center justify-center">
                   No Image
                  </div>
            }
        </div>

        <div className="py-2">
            <p className="text-2xl font-bold">{item.title}</p>
            <p className="text-sm text-gray-500">{item.description}</p>
        </div>

        <div className="flex justify-between items-center">
            <span className='text-sm font-bold'>{item.price}</span>
            <button 
                onClick={()=>actionAddtoCart(item)}
                className='bg-blue-500 rounded-md p-2 
                           hover:bg-blue-700 shadow-md 
                           text-white'
            >
                <ShoppingCart />
            </button>
        </div>

    </div>
  )
}

export default ProductCard
