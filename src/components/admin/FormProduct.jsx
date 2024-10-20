import { useEffect, useState } from "react";
import useEcomStore from "../../Store/ecom-store";
import { createProduct, deleteProduct } from "../../api/Product";
import { toast } from "react-toastify";
import UploadFile from "./UploadFile";
import { Link } from "react-router-dom";

const initialState = {
  title: "",
  description: "",
  price: 0,
  quantity: 0,
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
    getProduct(token, 100);
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
      setForm(initialState)
      toast.success(`Add Product ${res.data.title} Success`);
      getProduct(token, 100)
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async(id)=>{
    if(window.confirm('ต้องการลบสินค้าใช่หรือไม่')){
      try{
        const res = await deleteProduct(token, id)
        console.log(res)
        toast.success('ลบสินค้าเรียบร้อยแล้ว')
        getProduct(token,100)
      }catch(err){
        console.log(err)
      }
    }
  }



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
            <th scope="col">ภาพ</th>
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
                    <td>
                      {
                        item.images.length > 0
                        ?<img 
                          className="w-24 h-24 rounded-lg shadow-md"
                          src={item.images[0].url} 
                        />
                        :<div 
                          className="w-24 h-24 bg-slate-300 rounded-md flex items-center justify-center shadow-sm">
                            No image
                        </div>
                      }
                    </td>
                    <td>{item.title}</td>
                    <td>{item.description}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>{item.sold}</td>
                    <td>{item.updatedAt}</td>
                    <td className="flex gap-2">
                        <p className="bg-yellow-500 rounded-md p-1 shadow-md">
                          <Link to={'/admin/product/' + item.id}>
                            แก้ไข
                          </Link>
                        </p>


                        <p 
                        className="bg-red-500 rounded-md p-1 shadow-md text-white"
                        onClick={()=>handleDelete(item.id)}>
                          ลบ
                        </p>
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
