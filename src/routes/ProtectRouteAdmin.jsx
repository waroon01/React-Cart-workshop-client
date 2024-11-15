// import { useEffect, useState } from "react"
// import useEcomStore from "../Store/ecom-store"
// import { currentAdmin } from "../api/auth"
// import LoadingToRedirect from "./LoadingToRedirect"

// const ProtectRouteAdmin = ({ element }) => {
//     console.log("protectAdmin")
//     const [ ok, setOk ] = useState(false)
//     const user = useEcomStore((state)=> state.user)
//     const token = useEcomStore((state)=> state.token)

//     useEffect(()=>{
//         if(user && token){
//             // send to back
//         currentAdmin(token)
//         .then((res)=>setOk(true))
//         .catch((err)=>setOk(false))

//         }
//     },[])

//   return ok ? element : <LoadingToRedirect />
// }

// export default ProtectRouteAdmin


import { useEffect, useState } from "react";
import useEcomStore from "../Store/ecom-store";
import { currentAdmin } from "../api/auth";
import LoadingToRedirect from "./LoadingToRedirect";

const ProtectRouteAdmin = ({ element }) => {
    const [ok, setOk] = useState(null); // ตั้งค่าเริ่มต้นเป็น null
    const user = useEcomStore((state) => state.user);
    const token = useEcomStore((state) => state.token);

    useEffect(() => {
        if (user && token) {
            currentAdmin(token)
                .then((res) => {
                    setOk(true); // ตั้งค่าเป็น true เมื่อสำเร็จ
                })
                .catch((err) => {
                    console.error("Admin authentication failed:", err);
                    setOk(false); // ตั้งค่าเป็น false เมื่อเกิดข้อผิดพลาด
                });
        } else {
            setOk(false); // ตั้งค่าเป็น false ถ้าไม่มี user หรือ token
        }
    }, [token, user]);

    if (ok === null) {
        return <div>Loading...</div>; // แสดงข้อความ loading ขณะกำลังตรวจสอบสิทธิ์
    }

    return ok ? element : <LoadingToRedirect />; // เงื่อนไขเปลี่ยนหน้าเมื่อ ok เป็น true หรือ false
};

export default ProtectRouteAdmin;
