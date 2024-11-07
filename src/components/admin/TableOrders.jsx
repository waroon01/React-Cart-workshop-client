import { useState } from "react";
import { changOrdersStatus, getOrdersAdmin } from "../../api/admin";
import useEcomStore from "../../Store/ecom-store";
import { useEffect } from "react";
import { numberFormat } from "../../utils/number";
import { dateFormat } from "../../utils/deateFormat";
import { toast } from "react-toastify";



const TableOrders = () => {
  const token = useEcomStore((state) => state.token);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    handleGetOrder(token);
  }, []);

  const handleGetOrder = (token) => {
    getOrdersAdmin(token)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeOrderStatus = (token, orderId, orderStatus)=>{
    console.log(token, orderId, orderStatus)
    changOrdersStatus(token, orderId, orderStatus)
      .then((res) => {
        console.log(res);
        toast.success('Update Status Success!!!')
        handleGetOrder(token)
      })
      .catch((err) => {
        console.log(err);
      });

  }


  const getStatusColor = (status) => {
    switch (status) {
      case "Not Process":
        return "bg-gray-200";
      case "Processing":
        return "bg-blue-200";
      case "Completed":
        return "bg-green-200";
      case "Cancelled":
        return "bg-red-200";
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow-md">
      <div>
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-200 border">
              <th>#</th>
              <th>ผู้ใช้งาน</th>
              <th>วันที่</th>
              <th>สินค้า</th>
              <th>รวม</th>
              <th>สถานะ</th>
              <th>จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item, index) => {
              return (
                <tr key={index} className="border">
                  <td className="text-center">{index + 1}</td>
                  <td>
                    <p>{item.orderedBy.email}</p>
                    <p>{item.orderedBy.address}</p>
                  </td>
                  <td>
                    { dateFormat(item.createdAt)}
                  </td>
                    <td className="px-2 py-4">
                    {item.products?.map((product, index) => (
                      <li key={index}>
                        {product.product.title}
                        <span className="text-sm">{product.count} X {numberFormat(product.product.price)}</span>
                      </li>
                    ))}
                    </td>
 

                  <td>{ numberFormat(item.cartTotal) }</td>
                  <td><span className={`${getStatusColor(item.orderStatus)} text-sm rounded-full px-2 py-1`}>{item.orderStatus}</span></td>
                  <td>
                      <select 
                        name="" 
                        className=""
                        value={item.orderStatus}
                        onChange={(e)=>handleChangeOrderStatus(token, item.id, e.target.value)}
                      >
                        <option>Not Process</option>
                        <option>Processing</option>
                        <option>Completed</option>
                        <option>Cancelled</option>
                      </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableOrders;
