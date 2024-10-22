import { Trash2 } from 'lucide-react';

const CartCard = () => {
  return (
    <div>

        <h1 className="text-2xl font-bold">ตะกร้าสินค้า</h1>
        {/* border */}
        <div className="border p-2">
            {/* Card สีขาว */}
            <div className="bg-white p-2 rounded-md shadow-md">
                {/* row 1 */}
                <div className="flex justify-between mb-2">

                    {/* left */}
                    <div className="flex gap-2 items-center">
                        <div className="w-16 h-16 bg-gray-200 rounded-md flex text-center items-center">
                            no image
                        </div>
                        <div>
                            <p className="font-bold">Title</p>
                            <p className="text-sm">Description</p>
                        </div>
                    </div>

                    {/* right */}
                    <div className='text-red-500 p-2'>
                        <Trash2 />
                    </div>
                </div>

                {/* row 2 */}
                <div className="flex justify-between">
                    {/* left */}
                    <div className="border rounded-sm px-2 py-1">
                        <button className="px-2 py-1 bg-gray-200 rounded-sm hover:bg-red-400">-</button>
                        <span className="px-4">1</span>
                        <button className="px-2 py-1 bg-gray-200 rounded-sm hover:bg-blue-400">+</button>
                    </div>

                    {/* right */}
                    <div className="font-bold text-blue-500">
                        1000
                    </div>

                </div>  


            </div>
            {/* Total */}
            <div className='flex justify-between px-2'>
                <span>รวม</span>
                <span>5000</span>
            </div>
            {/* button */}
            <button className='mt-4 hover:bg-green-600 bg-green-500 text-white w-full py-2 rounded-md shadow-md'>ดำเนินการชำระเงิน</button>    
        </div>
    </div>
  )
}

export default CartCard