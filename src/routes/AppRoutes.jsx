import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "../pages/Home"
import Shop from "../pages/Shop"
import Cart from "../pages/Cart"
import History from "../pages/History"
import CheckOut from "../pages/CheckOut"
import Login from "../pages/auth/Login"
import Register from "../pages/auth/Register"
import Layout from "../Layouts/Layout"
import Dashboard from "../pages/admin/Dashboard"
import Product from "../pages/admin/Product"
import LayoutAdmin from "../Layouts/LayoutAdmin"
import Category from "../pages/admin/Category.jsx"
import Manage from "../pages/admin/Manage.jsx"
import LayoutUser from "../Layouts/LayoutUser.jsx"
import HomeUser from "../pages/user/HomeUser.jsx"
import ProtectRouteUser from "./ProtectRouteUser.jsx"
import ProtectRouteAdmin from "./ProtectRouteAdmin.jsx"
import EditProduct from "../pages/admin/EditProduct.jsx"
import Payment from "../pages/user/Payment.jsx"



const router = createBrowserRouter([
  { 
    path: '/', 
    element: <Layout /> ,
    children: [
      { index: true, element: <Home /> },
      { path: '/shop', element: <Shop /> },
      { path: 'cart', element: <Cart /> },
      { path: 'history', element: <History /> },
      { path: 'checkout', element: <CheckOut /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
    ]
  },
  {
    path: '/admin',
    element: <ProtectRouteAdmin element={<LayoutAdmin />}/> ,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'category', element: <Category />  },
      { path: 'product', element: <Product />  },
      { path: 'product/:id', element: <EditProduct />  },
      { path: 'manage', element: <Manage /> }
    ]
  },  
  {
    path: '/user',
    // element: <LayoutUser />,
    element: <ProtectRouteUser element={<LayoutUser />} />,
    children: [
      { index: true, element: <HomeUser /> },
      { path: 'payment', element: <Payment /> },
    ]
  },  


])



const AppRoutes = () => {
  return (
    <>
        <RouterProvider router={router} />
    </>
  )
}

export default AppRoutes
