import { Link, NavLink } from "react-router-dom";
import useEcomStore from "../Store/ecom-store";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const MainNav = () => {
  const carts = useEcomStore((state) => state.carts);
  const user = useEcomStore((state) => state.user);
  const logout = useEcomStore((state) => state.logout);
  // console.log(Boolean(user))

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // console.log(carts.length)

  return (
    <nav className="bg-white shadow-md">
      <div className="mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-6">
            <Link to={"/"} className="text-2xl font-bold ">
              Logo
            </Link>

            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                  : "hover:bg-slate-200 px-3 py-2 rounded-md text-sm font-medium"
              }
            >
              Home
            </NavLink>

            <NavLink
              to={"/shop"}
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                  : "hover:bg-slate-200 px-3 py-2 rounded-md text-sm font-medium"
              }
            >
              Shop
            </NavLink>

            <NavLink
              to={"/cart"}
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                  : "hover:bg-slate-200 px-3 py-2 rounded-md text-sm font-medium"
              }
            >
              Cart
              {carts.length > 0 && (
                <span className="absolute top-0 bg-red-500 rounded-full px-2 text-white">
                  {carts.length}
                </span>
              )}
            </NavLink>
          </div>

          {user ? (
            <div className="flex items-center gap-4">
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-2 hover:bg-gray-200 px-2 py-3 rounded-md"
              >
                <img
                  className="w-10 h-10 rounded-full"
                  src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
                />
                <ChevronDown />
              </button>
              {
                // หาค่าเท็จถ้าเป็นเท็จก็จะหยุด ถ้าจริงจะทำที่ตัวหลังเครื่องหมาย &&
                isOpen && (
                  <div className="absolute top-16 bg-white shadow-sm ">
                    <Link
                      to={"/user/history"}
                      className="block px-5 py-2 hover:bg-gray-200"
                    >
                      History
                    </Link>

                    <button
                      onClick={() => logout()}
                      className="block px-5 py-2 hover:bg-gray-200"
                    >
                      Logout
                    </button>
                  </div>
                )
              }
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <NavLink
                to={"/register"}
                className={({ isActive }) =>
                  isActive
                    ? "bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                    : "hover:bg-slate-200 px-3 py-2 rounded-md text-sm font-medium"
                }
              >
                Register
              </NavLink>

              <NavLink
                to={"/login"}
                className={({ isActive }) =>
                  isActive
                    ? "bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                    : "hover:bg-slate-200 px-3 py-2 rounded-md text-sm font-medium"
                }
              >
                Login
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
