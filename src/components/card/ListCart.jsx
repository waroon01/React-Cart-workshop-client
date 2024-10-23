import { ListTodo } from "lucide-react";
import useEcomStore from "../../Store/ecom-store";
import { Link, useNavigate } from "react-router-dom";
import { createUserCart } from "../../api/user";
import { toast } from "react-toastify";

const ListCart = () => {
  const cart = useEcomStore((state) => state.carts); //เนื่องจากหลังบ้าน ใช้ key ว่า cart ไม่มี s 
  const user = useEcomStore((state)=>state.user)
  const token = useEcomStore((state)=>state.token)
  const getTotalPrice = useEcomStore((state)=>state.getTotalPrice)  
  const navigate = useNavigate()

  const handleSaveCart = async()=>{
    console.log({cart})
    await createUserCart(token, {cart}) //ครอบปีกกาเนื่องจากต้องส่งเป็น object
    .then((res)=>{
      console.log(res)
      toast.success(`เพิ่มสินค้าลงตะกร้าสินค้าเรียบร้อยแล้ว`,{
        position: "top-center"
      })
      navigate('/checkout')
      
    })
    .catch((err)=>{
      console.log(err)
    })
  }


  // console.log(user)
  return (
    <div className="bg-gray-200 rounded-sm p-4">
      {/* Header */}
      <div className="flex gap-4 mb-4">
        <ListTodo size={35} />
        <p className="text-2xl font-bold">รายการสินค้า {cart.length} รายการ</p>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* left */}
        <div className="col-span-2">
          {/* Card สีขาว */}
          {cart.map((item, index) => (
            <div
              key={index}
              className="bg-white p-2  rounded-md shadow-md mb-2"
            >
              {/* row 1 */}
              <div className="flex justify-between mb-2">
                {/* left */}
                <div className="flex gap-2 items-center">
                  {item.images && item.images.length > 0 ? (
                    <img
                      src={item.images[0].url}
                      className="w-16 h-16 rounded-md"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 rounded-md flex text-center items-center">
                      no image
                    </div>
                  )}

                  <div>
                    <p className="font-bold">{item.title}</p>
                    <p className="text-sm">{item.price} x {item.count}</p>
                  </div>
                </div>

                {/* right */}
                <div>
                  <div className="font-bold text-blue-500">{item.price * item.count}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* right */}
        <div className="bg-white p-4 rounded-md shadow-md space-y-4">
          <p>ยอดรวม</p>
          <div className="flex justify-between">
            <span className="text-2xl font-bold">รวมสุทธิ</span>
            <span className="text-2xl">{getTotalPrice()}</span>
          </div>

        <div className="4">

          {
            user
            ? <Link>
                <button onClick={handleSaveCart} className="bg-red-500 w-full rounded-md mb-4 text-white py-2 shadow-md hover:bg-red-700">สั่งซื้อ</button>
              </Link>
            : <Link to={'/login'}>
                <button className="bg-blue-500 w-full rounded-md mb-4 text-white py-2 shadow-md hover:bg-blue-700">Login</button>
              </Link>
          }





          <Link to={'/shop'}>
            <button className="bg-gray-500 w-full rounded-md text-white py-2 shadow-md hover:bg-gray-700">แก้ไขรายการ</button>
          </Link>            
        </div>      

          

        </div>

      </div>
    </div>
  );
};

export default ListCart;
