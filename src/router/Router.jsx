import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/home/Home";
import Menu from "../pages/shop/Menu";
import Signup from "../components/Signup";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import UpdateProfile from "../pages/dashboard/UpdateProfile";
import CartPage from "../pages/shop/CartPage";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/menu",
          element: <PrivateRoute><Menu /></PrivateRoute>,
        },
        {
          path: "/update-profile",
          element: <UpdateProfile />,
        },
        {
          path: "/cart-page",
          element: <CartPage />,
        }
      ]
    },
    {
      path: "/signup",
      element: <Signup />
    }
  ]);

export default router;