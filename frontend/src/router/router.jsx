import React from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import Signup from '../components/UI/Signup'
import Login from '../components/UI/Login'
import Home from '../components/UI/Home'
import Cart from '../components/UI/Cart'
import UnProtected from '../components/UI/UnProtected'
import Protected from '../components/UI/Protected'
import Order from '../components/UI/Order'
import MyOrder from '../components/UI/MyOrder'
import Dashboard from '../components/UI/Dashboard'
import AdminUser from '../components/UI/AdminUser'
import AdminProduct from '../components/UI/AdminProduct'
import AdminOrder from '../components/UI/AdminOrder'
import Profile from '../components/UI/Profile'
import OpenRoutes from '../components/UI/OpenRoutes'
import GoogleAuth from '../components/UI/GoogleAuth'
import SuccessPayment from '../components/UI/SuccessPayment';
import CancelPayment from '../components/UI/CancelPayment';


const Router = createBrowserRouter([
    {
        element: <OpenRoutes />,
        children: [{
            path: "/",
            element: <Home />
        },
        {
            path: "/cart",
            element: <Cart />
        },
        {
            path: "/googleauth",
            element: <GoogleAuth />
        },
        {
            path: "/paymentsuccess",
            element: <SuccessPayment />
        },
        {
            path: "/cancelPayment",
            element: <CancelPayment />
        },
        ]
    },
    {
        element: <UnProtected />,
        children: [
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/Signup",
                element: <Signup />
            },
        ]
    },
    {
        element: <Protected allowedRole={["User"]} />,
        children: [
            {
                path: "/order",
                element: <Order />
            },
            {
                path: "/myorder",
                element: <MyOrder />
            }
        ]
    },
    {
        element: <Protected allowedRole={["Admin"]} />,
        children: [
            {
                path: "/dashboard",
                element: <Dashboard />
            },
            {
                path: "/adminuser",
                element: <AdminUser />
            },
            {
                path: "/adminproduct",
                element: <AdminProduct />
            },
            {
                path: "/adminorder",
                element: <AdminOrder />
            },
        ]
    },
    {
        element: <Protected allowedRole={["User", "Admin"]} />,
        children: [
            {
                path: "/profile",
                element: <Profile />
            }
        ]
    }
])

export default Router

// /login , /signup --- anyone but not logged-in user
// /cart , / --- anyone
// /profile --- both admin and user
// /dashboard , /adminuser , /adminproduct , /adminorder --- Admin
// /order , /myorders --- User