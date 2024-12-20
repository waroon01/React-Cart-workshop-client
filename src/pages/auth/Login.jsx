import { useState } from "react";
import { toast } from "react-toastify";
import useEcomStore from "../../Store/ecom-store";
import { useNavigate } from "react-router-dom";

const Login = () => {
  //ตัวอย่างรับค่า store zustand
  // const name = useEcomStore((state)=>state.name)
  // console.log(name)
  const navigate = useNavigate();

  const actionLogin = useEcomStore((state) => state.actionLogin);
  const user = useEcomStore((state) => state.user);
  console.log("user from zustand ", user);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    console.log(e.target.value, e.target.name);
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send to Backend
    try {
      const res = await actionLogin(form);
      console.log("res =>", res);
      //check role หรือสิทธ์
      const role = res.data.payload.role;
      console.log(role);
      roleRedirect(role);

      toast.success("welcome Back");
    } catch (err) {
      console.log(err);
      const errMsg = err.response?.data?.message;
      toast.error(errMsg);
    }
  };

  //ฟังก์ชั่นตรวจสอบสิทธ์
  const roleRedirect = (role) => {
    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full shadow-md bg-white p-8 max-w-md">
        <h1 className="text-center my-4 font-bold text-2xl">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              className="w-full px-3 py-2 rounded-md border 
            focus:outline-none focus:ring-2 focus:ring-blue-500
            focus:border-transparent"
              onChange={handleOnChange}
              name="email"
              type="email"
              placeholder="Email"
            />
            <input
              className="w-full px-3 py-2 rounded-md border 
            focus:outline-none focus:ring-2 focus:ring-blue-500
            focus:border-transparent"
              onChange={handleOnChange}
              type="password"
              name="password"
              placeholder="Password"
            />
            <button className="bg-blue-500 rounded-md w-full
            text-white font-bold py-3 shadow-md
            hover:bg-blue-700 ">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
