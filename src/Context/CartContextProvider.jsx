import { createContext, useEffect, useState } from "react";
import { axiosBaseUrl } from "../AxiosBaseUrl/AxiosBaseUrl";
import toast from "react-hot-toast";

export const CartContext = createContext();

function CartContextProvider({ children }) {
  const headers = {
    token: localStorage.getItem("Token"),
  };
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState(null);

  const addToCart = async (id) => {
    try {
        setIsLoading(true)
      const res = await axiosBaseUrl.post(
        "/cart",
        {
          productId: id,
        },
        { headers }
      );
    //   console.log(res);
      setCart(res.data);

      toast.success(res.data.message);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    } finally{
        setIsLoading(false)
    }
  };
  const getCart = async () => {
    try {
        setIsLoading(true)
      const res = await axiosBaseUrl.get(
        "/cart",
        { headers }
      );
      // console.log(res.data);
      setCart(res.data);

    } catch (err) {
      console.log(err);
    } finally {
        setIsLoading(false)
    }
  };
  const quantity = async (id,number) => {
    try {
        setIsLoading(true)
      const res = await axiosBaseUrl.put(
        `/cart/${id}`,
        {
            "count": number
        },
        { headers }
      );
    //   console.log(res.data);
      setCart(res.data);

    } catch (err) {
      console.log(err);
    } finally {
        setIsLoading(false)
    }
  };
  const Checkout = async (data) => {
    try {
        setIsLoading(true)
      const res = await axiosBaseUrl.post(
        `/orders/checkout-session/${cart.data._id}?url=http://localhost:5173`,
        {
            "shippingAddress":data
        },
        { headers }
      );
      console.log(res)
    window.location.href = res.data.session.url;

    } catch (err) {
      console.log(err);
    } finally {
        setIsLoading(false)
    }
};
const removeProduct = async (id) => {
  try {
      setIsLoading(true)
    const res = await axiosBaseUrl.delete(
      `/cart/${id}`,
      { headers }
    );
  //   console.log(res.data);
    setCart(res.data);

  } catch (err) {
    console.log(err);
  } finally {
      setIsLoading(false)
  }
};
const clearCart = async () => {
  try {
      setIsLoading(true)
    const res = await axiosBaseUrl.delete(
      `/cart`,
      { headers }
    );
  console.log(res)
    setCart(null);

  } catch (err) {
    console.log(err);
  } finally {
      setIsLoading(false)
  }
};

  useEffect(()=>{
    // getCart();
    // console.log("token")
    {localStorage.getItem("Token") && getCart()}


    

  },[])

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, getCart ,isLoading,quantity ,removeProduct,Checkout,clearCart}}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContextProvider;
