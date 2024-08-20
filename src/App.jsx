import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayOut from "./Pages/LayOut/LayOut";
import Home from "./Pages/Home/Home";
import Brand from "./Pages/Brand/Brand";
import Product from "./Pages/Products/Products";
import Categories from "./Pages/Categories/Categories";
import Login from "./Auth/Login/Login";
import Register from "./Auth/Register/Register";
import Cart from "./Pages/Cart/Cart";
import { Toaster } from "react-hot-toast";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  // useQuery,
  // useMutation,
  // useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import TokenContextProvider from "./Context/TokenContext";
import ProtectedRouters from "./Pages/ProtectRouters/ProtectedRouters";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import CartContextProvider from "./Context/CartContextProvider";
import CheckOut from "./Pages/CheckOut/CheckOut";
import AllOrders from "./Pages/AllOrders/AllOrders";
import ForgetPassword from "./Pages/ForgetPassword/ForgetPassword";
import VerifyResetCode from "./Pages/ForgetPassword/VerifyResetCode";
import RestNewPassword from "./Pages/ForgetPassword/RestNewPassword";
import WishListContextProvider from "./Context/WishListContextProvider";
import WishList from './Pages/Wish List/WishList';

const Routers = createBrowserRouter([
  {
    path: "",
    element: <LayOut />,
    children: [
      {
        path: "home",
        element: (
          <ProtectedRouters>
            <Home />
          </ProtectedRouters>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRouters>
            <Cart />
          </ProtectedRouters>
        ),
      },
      {
        path: "WishList",
        element: (
          <ProtectedRouters>
            <WishList />
          </ProtectedRouters>
        ),
      },
      {
        path: "product",
        element: (
          <ProtectedRouters>
            <Product />
          </ProtectedRouters>
        ),
      },
      {
        path: "categoies",
        element: (
          <ProtectedRouters>
            <Categories />
          </ProtectedRouters>
        ),
      },
      {
        path: "brand",
        element: (
          <ProtectedRouters>
            <Brand />
          </ProtectedRouters>
        ),
      },
      { index: true, element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "productDetails/:id", element: <ProductDetails /> },
      { path: "checkout", element: <CheckOut /> },
      { path: "allorders", element: <AllOrders /> },
      { path: "ForgetPassword", element: <ForgetPassword /> },
      { path: "verifyResetCode", element: <VerifyResetCode /> },
      { path: "restNewPassword", element: <RestNewPassword /> },
    ],
  },
]);

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <WishListContextProvider>
        <CartContextProvider>
          <TokenContextProvider>
            <QueryClientProvider client={queryClient}>
              <RouterProvider router={Routers}></RouterProvider>
            </QueryClientProvider>
          </TokenContextProvider>
        </CartContextProvider>
      </WishListContextProvider>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
