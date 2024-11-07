import { useState, useEffect } from "react";
import { getOrders } from "../../api/user";
import useEcomStore from "../../Store/ecom-store";
import { dateFormat } from "../../utils/deateFormat";
import { numberFormat } from "../../utils/number";

const HistoryCard = () => {
  const [orders, setOrders] = useState([]);
  const token = useEcomStore((state) => state.token);

  useEffect(() => {
    hdlGetOrders(token);
  }, []);

  const hdlGetOrders = (token) => {
    getOrders(token)
      .then((res) => {
        // console.log(res);
        setOrders(res.data.orders);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Not Process":
        return "bg-yellow-200";
      case "Processing":
        return "bg-blue-200";
      case "Completed":
        return "bg-green-200";
      case "Cancelled":
        return "bg-red-200";
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold ms-20">ประวัดการสั่งซื้อ</h1>

      {/* คลุมทั้งหมด */}
      <div className="space-y-4">
        {/* card Loop Order */}

        {orders?.map((item, index) => {
          // console.log(item);

          return (
            <div key={index} className="space-y-4 mx-20">
              <div className="bg-gray-100 p-4 rounded-md shadow-md">
                {/* header */}
                <div className="flex justify-between">
                  <div className="">
                    <p className="text-sm">Order Date</p>
                    <p className="font-bold">{dateFormat(item.updatedAt)}</p>
                  </div>
                  <div className="">
                    <span className={`${getStatusColor(item.orderStatus)} px-2 py-1 rounded-full`}>{item.orderStatus}</span>
                  </div>
                </div>

                {/* Table Loop Product */}
                <div className="bg-white">
                  <table className="border w-full">
                    <thead>
                      <tr className="bg-gray-300">
                        <th>สินค้า</th>
                        <th>ราคา</th>
                        <th>จำนวน</th>
                        <th>รวม</th>
                      </tr>
                    </thead>

                    <tbody>
                      {item.products?.map((product, index) => {
                        return (
                          <tr key={index}>
                            <td>{product.product.title}</td>
                            <td>{numberFormat(product.product.price)}</td>
                            <td>{product.count}</td>
                            <td>
                              {numberFormat(
                                product.count * product.product.price
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Total */}
                <div className="">
                  <div className="text-right">
                    <p>ราคาสุทธิ</p>
                    <p>{numberFormat(item.cartTotal)}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HistoryCard;
