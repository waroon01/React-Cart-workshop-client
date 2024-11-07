import { useEffect, useState } from "react";
import { changeUserRole, changeUserStatus, getlistAllUser } from "../../api/admin";
import useEcomStore from "../../Store/ecom-store";
import { toast } from "react-toastify";

const TableUsers = () => {
  const token = useEcomStore((state) => state.token);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    handleGetUsers(token);
  }, []);

  const handleGetUsers = (token) => {
    getlistAllUser(token)
      .then((res) => {
        console.log(res.data)
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleChangUserStatus = (userId,userStatus)=>{
    // console.log(userId,userStatus)
    const value = {
      id : userId,
      enabled: !userStatus
    }
    changeUserStatus(token, value)
    .then((res)=>{
      console.log(res)
      handleGetUsers(token)
      toast.success("Update Status Success!!!")
    })
    .catch(err=> console.log(err))
  }

  const handleChangUserRole = (userId, userRole) => {
    const value = {
      id: userId,
      role: userRole, // เปลี่ยนจาก enabled เป็น role
    };
    
    changeUserRole(token, value)
      .then((res) => {
        console.log(res);
        handleGetUsers(token);
        toast.success("Update Role Success!!!")
      })
      .catch((err) => console.log(err));
  };
  

  return (
    <div className="container mx-auto p-4 bg-white shadow-md">
      <h1 className="font-bold text-2xl">รายชื่อผู้ใช้บริการ</h1>
      <div className="border mt-4">
        <table className="w-full">
          <thead>
            <tr className="bg-blue-300 border h-10">
              <th className="text-center">#</th>
              <th className="text-center">Email</th>
              <th className="text-center">สิทธิ์</th>
              <th className="text-center">สถานะ</th>
              <th className="text-center">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="border">
                <td className="text-center">{index + 1}</td>
                <td className="text-center">{user.email}</td>

                <td>
                  <select 
                    value={user.role} 
                    onChange={(e)=>handleChangUserRole(user.id, e.target.value)}>
                    <option>user</option>
                    <option>admin</option>
                  </select>
                  </td>

                



                <td className="text-center">{`${user.enabled ? "Active" : "Inactive"}`}</td>

                <td 
                  className="text-center"
                >
                  <button
                    className="bg-yellow-400 rounded-sm px-2 py-1 text-white hover:bg-yellow-500"
                    onClick={()=>handleChangUserStatus(user.id, user.enabled)}
                  >
                    {user.enabled ? 'Disable' : 'Enable'}
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableUsers;
