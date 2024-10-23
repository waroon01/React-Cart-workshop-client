import { useState } from "react"
import { toast } from 'react-toastify';
import useEcomStore from "../../Store/ecom-store";
import { useNavigate } from "react-router-dom";

const Login = () => {
  //ตัวอย่างรับค่า store zustand
  // const name = useEcomStore((state)=>state.name)
  // console.log(name)
  const navigate = useNavigate()

  const actionLogin = useEcomStore((state)=>state.actionLogin)
  const user = useEcomStore((state)=>state.user)
  console.log("user from zustand ",user )
  
  const [form, setForm] = useState({
    email: "",
    password: "",
  })  

  const handleOnChange = (e)=>{
    console.log(e.target.value, e.target.name)
    setForm({
      ...form,
      [e.target.name]: e.target.value 
    })
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    // Send to Backend
    try{
      const res = await actionLogin(form)
      console.log("res =>",res)
      //check role หรือสิทธ์
      const role = res.data.payload.role
      console.log(role)
      roleRedirect(role)

      toast.success('welcome Back')
    }catch(err){
      console.log(err)
      const errMsg = err.response?.data?.message
      toast.error(errMsg)
    }
  }

  //ฟังก์ชั่นตรวจสอบสิทธ์
  const roleRedirect = (role)=>{
    if(role === 'admin'){
      navigate('/admin')
    }else{
      navigate(-1)
    }
  }


  return (
    <div>Login
      <form onSubmit={handleSubmit}>

        Email
        <input className="border"
          onChange={handleOnChange}
          name="email"
          type="email"
        />

        Password
        <input className="border"
          onChange={handleOnChange}
          type="text" 
          name="password"
        />



        <button className="bg-blue-500 rounded-md" >Login</button>


      </form>
    </div>
  )
}

export default Login