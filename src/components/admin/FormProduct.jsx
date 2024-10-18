import { useEffect, useState } from "react";
import useEcomStore from "../../Store/ecom-store";
import { createProduct } from "../../api/Product";
import { toast } from "react-toastify";
import UploadFile from "./UploadFile";

const initialState = {
  title: "mouse",
  description: "mouse Asus",
  price: 350,
  quantity: 250,
  categoryId: "",
  images: [],
};

const FormProduct = () => {
  // const token = useEcomStore((state)=>state.token)
  // const getCatagory = useEcomStore((state)=>state.getCatagory)
  const { token, getCatagory, categories, getProduct, products } = useEcomStore(
    (state) => state
  );
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    getCatagory(token);
    getProduct(token, 20);
  }, []);

  // console.log("dd", products);

  const handleOnChange = (e) => {
    // console.log(e.target.name, e.target.value);
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createProduct(token, form);
      // console.log("datashow ", res);
      toast.success(`Add Product ${res.data.title} Success`);
      // getProduct(token, 20)
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow-md">
      <form className="" onSubmit={handleSubmit}>
        <h1>เพิ่มข้อมูลสินค้า</h1>
        <input
          name="title"
          className="border"
          value={form.title}
          placeholder="Title"
          onChange={handleOnChange}
        />

        <input
          name="description"
          className="border"
          value={form.description}
          placeholder="Description"
          onChange={handleOnChange}
        />

        <input
          type="number"
          name="price"
          className="border"
          value={form.price}
          placeholder="Price"
          onChange={handleOnChange}
        />

        <input
          type="number"
          name="quantity"
          className="border"
          value={form.quantity}
          placeholder="Quantity"
          onChange={handleOnChange}
        />

        <select
          className="border"
          name="categoryId"
          onChange={handleOnChange}
          value={form.categoryId}
          required
        >
          <option disabled value="">
            Please Select
          </option>
          {categories.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
          <hr />
          {/* upload File */}

          <UploadFile form={form} setForm={setForm} />


        <button className="bg-blue-500 mx-4 px-5 shadow-md py-3 text-white">
          Add Product
        </button>

        <hr />
        <br />

        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"> 
          <tr>
            <th scope="col">#</th>
            <th scope="col">ชื่อสินค้า</th>
            <th scope="col">รายละเอียด</th>
            <th scope="col">ราคา</th>
            <th scope="col">จำนวน</th>
            <th scope="col">จำนวนที่ขาย</th>
            <th scope="col">วันที่อัพเดท</th>
            <th scope="col">จัดการ</th>
          </tr>
        </thead>
        <tbody>

          {
            products.map((item, index)=>{
                // console.log(item)
                return (
                    <tr key={index}>
                    <th scope="row">{index+1}</th>
                    <td>{item.title}</td>
                    <td>{item.description}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>{item.sold}</td>
                    <td>{item.updatedAt}</td>
                    <td>
                        <p>แก้ไข</p>
                        <p>ลบ</p>
                    </td>
                  </tr>
                )
            })
          }


        </tbody>
      </table>

      </form>


    </div>
  );
};

export default FormProduct;
