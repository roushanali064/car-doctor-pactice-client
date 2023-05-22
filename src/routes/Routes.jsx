import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/Login/SignUp";
import CheckOut from "../pages/CheckOut/CheckOut";
import Order from "../pages/Order/Order";
import PrivateRoutes from "./PrivateRoutes";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children:[
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'signUp',
                element: <SignUp></SignUp>
            },
            {
                path: 'checkOut/:id',
                element:<PrivateRoutes><CheckOut></CheckOut></PrivateRoutes>,
                loader: ({params})=>fetch(`https://car-doctor-server-roan-six.vercel.app/services/${params.id}`)
            },
            {
                path: 'orderReview',
                element:<PrivateRoutes><Order></Order></PrivateRoutes>
            }
        ]
    },
]);
export default router;