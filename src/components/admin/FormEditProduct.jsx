import { useEffect, useState } from "react";
import useEcomStore from "../../Store/ecom-store";
import { createProduct, readProduct, listProduct, updateProduct } from "../../api/Product";
import { toast } from "react-toastify";
import UploadFile from "./UploadFile";
import { useNavigate, useParams } from "react-router-dom";


const initialState = {
  title: "mouse",
  description: "mouse Asus",
  price: 350,
  quantity: 250,
  categoryId: "",
  images: [],
};

const FormEditProduct = () => {
  const { id }  = useParams()
  const navigate = useNavigate()

  const token = useEcomStore((state)=>state.token)
  const getCatagory = useEcomStore((state)=>state.getCatagory)
  const categories = useEcomStore((state)=>state.categories)


  const [form, setForm] = useState(initialState);

  useEffect(() => {
    getCatagory(token)
    fetchProduct(token,id,form)
  }, []);

  const fetchProduct = async(token, id, form)=>{
    try{
        const res = await readProduct(token, id, form)
        console.log('res from backend ',res )
        setForm(res.data)
    }catch(err){
        console.log("error fetch data",err)
    }
  }

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
      const res = await updateProduct(token, id, form);
      // console.log("datashow ", res);
      toast.success(`Add Product ${res.data.title} Success`);
      navigate('/admin/product')

      // getProduct(token, 20)
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow-md">
      <form className="" onSubmit={handleSubmit}>
        <h1>แก้ไขข้อมูลสินค้า</h1>
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
          Edit Product
        </button>

        <hr />
        <br />

      </form>


    </div>
  );
};

export default FormEditProduct;
