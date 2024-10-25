import { useState, useEffect } from "react";
import { listUserCart, saveAddress } from "../../api/user";
import useEcomStore from "../../Store/ecom-store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const SummaryCard = () => {
  const token = useEcomStore((state) => state.token);
  const [products, setProducts] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  const [address, setAddress] = useState('')
  const [addressSaved, setAddressSaved] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    handleGetUserCart();
  }, []);

  const handleGetUserCart = () => {
    listUserCart(token)
      .then((res) => {
        console.log(res);
        setProducts(res.data.products);
        setCartTotal(res.data.cartTotal);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handelSaveAddress = ()=>{
    // console.log(address)
    if(!address){
      return toast.warning('Please fill address')
    }
    saveAddress(token,address)
    .then((res)=>{
      console.log(res)
      toast.success(res.data.message)
      setAddressSaved(true)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const handleGotoPayment = ()=>{
    if(!addressSaved){
      return toast.warning('กรุณากรอกที่อยู่และบันทึกที่อยู่ก่อน')
    }
    navigate('/user/payment')
  }


  return (
    <div className="mx-auto">
      <div className="flex gap-4">
        {/* left */}
        <div className="w-2/4">
          <div className="bg-gray-100 p-4 rounded-md border shadow-md space-y-4 ">
            <h1 className="text-lg font-bold">ที่อยู่ในการจัดส่ง</h1>
            <textarea 
              onChange={(e)=>setAddress(e.target.value)}
              required
              className="w-full px-2 rounded-md text-sm" 
              placeholder="กรอกที่อยู่จัดส่งสินค้า"
            />
            <button
              onClick={handelSaveAddress}
              className="bg-blue-500 text-white
            px-4 py-2 rounded-md shadow-md hover:bg-blue-700
            hover:scale-105 hover:translate-y-1 hover:duration-200"
            >
              Save Address
            </button>
          </div>
        </div>

        {/* right */}
        <div className="w-2/4">
          <div className="bg-white p-4 rounded-md border shadow-md space-y-4">
            <h1 className="text-lg font-bold">คำสั่งซื้อของคุณ</h1>

            {/* item List */}
            {products?.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="font-bold">{item.product.title}</p>
                    <p className="text-sm">จำนวน: {item.count} X {item.product.price}</p>
                  </div>

                  <div>
                    <p className="text-red-500 font-bold">{item.count * item.product.price}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* ค่าจัดส่ง */}

            <div>
              <div className="flex justify-between">
                <p>ค่าจัดส่ง:</p>
                <p>0.00</p>
              </div>
              <div className="flex justify-between">
                <p>ส่วนลด:</p>
                <p>0.00</p>
              </div>
            </div>

            {/* รวมสุทธิ */}
            <hr />
            <div>
              <div className="flex justify-between">
                <p className="font-bold">ยอดรวมสุทธิ</p>
                <p className="text-red-500 font-bold text-lg">{cartTotal}</p>
              </div>
            </div>
            <div>
              <button 
              onClick={handleGotoPayment}
              className="bg-green-500 w-full px-4 py-5 font-bold text-xl text-white hover:bg-green-700 rounded-md"
              // disabled = {!addressSaved}
              >
                ดำเนินการชำระเงิน
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
