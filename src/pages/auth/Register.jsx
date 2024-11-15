import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import zxcvbn from "zxcvbn";

const registerSchema = z
  .object({
    email: z.string().email({ message: "Invalid email!!!" }),
    password: z.string().min(8, { message: "Password must more 8 Characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password is not match...!!!",
    path: ["confirmPassword"],
  });

const Register = () => {
  const [passwordScore, setPasswordScore] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const validatePassword = () => {
    let password = watch().password;
    return zxcvbn(password ? password : "").score;
  };

  useEffect(() => {
    setPasswordScore(validatePassword());
  }, [watch().password]);

  // const [form, setForm] = useState({
  //   email: "",
  //   password: "",
  //   confirmPassword: ""
  // })

  // const handleOnChange = (e)=>{
  //   console.log(e.target.value, e.target.name)
  //   setForm({
  //     ...form,
  //     [e.target.name]: e.target.value
  //   })
  // }

  // const hdlSubmit = async(e)=>{
  //   e.preventDefault()
  //   if(form.password !== form.confirmPassword){
  //     return alert('consfir Password is not match!!!')
  //   }
  //   console.log(form)
  //   // Send to Backend
  //   try{
  //     const res = await axios.post('https://react-cart-workshop-server.vercel.app/api/register',form)
  //     console.log(res)
  //     toast.success(res.data)
  //   }catch(err){
  //     const errMsg = err.response?.data?.message
  //     toast.error(errMsg)
  //     console.log(err)
  //   }

  // }

  async function handleValid(data) {
    // const passwordScore = zxcvbn(data.password).score;
    // console.log(passwordScore)
    // if(passwordScore < 3){
    //   toast.warning('Your password no Strong ')
    //   return
    // }
    // console.log('ok')
    // Send to Backend
    try {
      const res = await axios.post("https://react-cart-workshop-server.vercel.app/api/register", data);
      console.log(res);
      toast.success(res.data);
    } catch (err) {
      const errMsg = err.response?.data?.message;
      toast.error(errMsg);
      console.log(err);
    }
  }

  // const gukkghu = Array.from('gukkkkk')
  // console.log(gukkghu)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full shadow-md bg-white p-8 max-w-md">
        <h1 className="text-center my-4 font-bold text-2xl">Register</h1>

        <form onSubmit={handleSubmit(handleValid)}>
          <div className="space-y-4">
            <div>
              <input
                {...register("email")}
                placeholder="Email"
                className={`w-full px-3 py-2 rounded-md border 
            focus:outline-none focus:ring-2 focus:ring-blue-500
            focus:border-transparent
            ${errors.email && "border-red-500"}
            `}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div>
              <input {...register("password")} 
              type="password"
              placeholder="Password"
              className={`w-full px-3 py-2 rounded-md border 
                focus:outline-none focus:ring-2 focus:ring-blue-500
                focus:border-transparent
                ${errors.password && "border-red-500"}
                `}
              />

              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
              {watch().password?.length > 0 && (
                <div className="flex mt-2">
                  {Array.from(Array(5).keys()).map((item, index) => (
                    <span className="w-1/5 px-1" key={index}>
                      <div
                        className={`rounded-md h-2 ${
                          passwordScore <= 2
                            ? "bg-red-400"
                            : passwordScore < 4
                            ? "bg-yellow-400"
                            : "bg-green-400"
                        } 
              `}
                      ></div>
                    </span>
                  ))}
                </div>
              )}
            </div>


              <div>
            <input {...register("confirmPassword")} 
            type="password"
            placeholder="Confirm Password"
            className={`w-full px-3 py-2 rounded-md border 
              focus:outline-none focus:ring-2 focus:ring-blue-500
              focus:border-transparent
              ${errors.confirmPassword && "border-red-500"}
              `}
            />

            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
            )}
              </div>

            <button 
            className="bg-blue-500 rounded-md w-full
            text-white font-bold py-3 shadow-md
            hover:bg-blue-700 ">
              Register
              </button>


          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
