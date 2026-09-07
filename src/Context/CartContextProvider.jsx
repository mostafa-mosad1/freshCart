import { createContext, useEffect, useState } from "react";
import { axiosBaseUrl } from "../AxiosBaseUrl/AxiosBaseUrl";
import toast from "react-hot-toast";

export const CartContext = createContext();

export function CartContextProvider({ children }) {
  const [tokenStatus, setTokenStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState(null);

  const getHeaders = () => ({
    token: localStorage.getItem("Token") || "",
  });

  // Load guest cart from localStorage
  const getGuestCart = () => {
    try {
      const stored = localStorage.getItem("guest_cart");
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error(e);
    }
    return { numOfCartItems: 0, data: { products: [], totalCartPrice: 0 } };
  };

  // Save guest cart to localStorage and update state
  const saveGuestCart = (updatedCart) => {
    localStorage.setItem("guest_cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  // Sync guest cart to server on login
  const syncGuestCartToServer = async (authToken) => {
    try {
      const guestCart = getGuestCart();
      if (guestCart?.data?.products?.length > 0) {
        for (const item of guestCart.data.products) {
          const pId = item.product?.id || item.product?._id;
          if (pId) {
            for (let i = 0; i < (item.count || 1); i++) {
              await axiosBaseUrl.post(
                "/cart",
                { productId: pId },
                { headers: { token: authToken } }
              );
            }
          }
        }
        localStorage.removeItem("guest_cart");
      }
    } catch (err) {
      console.log("Sync error:", err);
    }
  };

  const addToCart = async (id, productData = null) => {
    const token = localStorage.getItem("Token");

    if (token) {
      // Authenticated User
      try {
        setIsLoading(true);
        const res = await axiosBaseUrl.post(
          "/cart",
          { productId: id },
          { headers: getHeaders() }
        );
        setCart(res.data);
        toast.success(res.data.message || "Added to cart successfully!");
        return true;
      } catch (err) {
        console.log(err);
        toast.error(err?.response?.data?.message || "Failed to add to cart");
        return false;
      } finally {
        setIsLoading(false);
      }
    } else {
      // Guest User - Store in localStorage
      try {
        setIsLoading(true);
        let guestCart = getGuestCart();
        let productObj = productData;

        // If product data wasn't passed directly, fetch it
        if (!productObj || !productObj.title) {
          try {
            const res = await axiosBaseUrl.get(`/products/${id}`);
            productObj = res?.data?.data;
          } catch (e) {
            console.log(e);
          }
        }

        const existingIndex = guestCart.data.products.findIndex(
          (item) => (item.product?.id || item.product?._id) === id
        );

        if (existingIndex > -1) {
          guestCart.data.products[existingIndex].count += 1;
        } else {
          guestCart.data.products.push({
            count: 1,
            price: productObj?.price || 0,
            product: {
              _id: id,
              id: id,
              title: productObj?.title || "Product",
              imageCover: productObj?.imageCover || productObj?.img || "",
              category:
                typeof productObj?.category === "object"
                  ? productObj?.category
                  : { name: productObj?.category || "Grocery" },
              ratingsAverage: productObj?.ratingsAverage || 4.8,
            },
          });
        }

        // Recalculate totals
        guestCart.numOfCartItems = guestCart.data.products.reduce(
          (sum, item) => sum + item.count,
          0
        );
        guestCart.data.totalCartPrice = guestCart.data.products.reduce(
          (sum, item) => sum + item.price * item.count,
          0
        );

        saveGuestCart(guestCart);
        toast.success("تمت الإضافة إلى السلة بنجاح!");
        return true;
      } catch (err) {
        console.log(err);
        toast.error("حدث خطأ أثناء الإضافة إلى السلة");
        return false;
      } finally {
        setIsLoading(false);
      }
    }
  };

  const getCart = async () => {
    const token = localStorage.getItem("Token");
    if (token) {
      try {
        setIsLoading(true);
        const res = await axiosBaseUrl.get("/cart", { headers: getHeaders() });
        setCart(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    } else {
      const guestCart = getGuestCart();
      setCart(guestCart);
    }
  };

  const quantity = async (id, number) => {
    const token = localStorage.getItem("Token");
    if (token) {
      try {
        setIsLoading(true);
        const res = await axiosBaseUrl.put(
          `/cart/${id}`,
          { count: number },
          { headers: getHeaders() }
        );
        setCart(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    } else {
      // Guest User
      let guestCart = getGuestCart();
      const existingIndex = guestCart.data.products.findIndex(
        (item) => (item.product?.id || item.product?._id) === id
      );

      if (existingIndex > -1) {
        if (number <= 0) {
          guestCart.data.products.splice(existingIndex, 1);
        } else {
          guestCart.data.products[existingIndex].count = number;
        }

        guestCart.numOfCartItems = guestCart.data.products.reduce(
          (sum, item) => sum + item.count,
          0
        );
        guestCart.data.totalCartPrice = guestCart.data.products.reduce(
          (sum, item) => sum + item.price * item.count,
          0
        );
        saveGuestCart(guestCart);
      }
    }
  };

  const Checkout = async (data) => {
    const token = localStorage.getItem("Token");
    if (!token) return;
    try {
      setIsLoading(true);
      const res = await axiosBaseUrl.post(
        `/orders/checkout-session/${cart?.data?._id}?url=https://fresh-cart-five-delta.vercel.app`,
        { shippingAddress: data },
        { headers: getHeaders() }
      );
      window.location.href = res.data.session.url;
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const removeProduct = async (id) => {
    const token = localStorage.getItem("Token");
    if (token) {
      try {
        setIsLoading(true);
        const res = await axiosBaseUrl.delete(`/cart/${id}`, { headers: getHeaders() });
        setCart(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    } else {
      let guestCart = getGuestCart();
      guestCart.data.products = guestCart.data.products.filter(
        (item) => (item.product?.id || item.product?._id) !== id
      );
      guestCart.numOfCartItems = guestCart.data.products.reduce(
        (sum, item) => sum + item.count,
        0
      );
      guestCart.data.totalCartPrice = guestCart.data.products.reduce(
        (sum, item) => sum + item.price * item.count,
        0
      );
      saveGuestCart(guestCart);
    }
  };

  const clearCart = async () => {
    const token = localStorage.getItem("Token");
    if (token) {
      try {
        setIsLoading(true);
        await axiosBaseUrl.delete(`/cart`, { headers: getHeaders() });
        setCart(null);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    } else {
      localStorage.removeItem("guest_cart");
      setCart({ numOfCartItems: 0, data: { products: [], totalCartPrice: 0 } });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (token) {
      setTokenStatus(true);
      // If there was guest items, sync them first then get server cart
      syncGuestCartToServer(token).then(() => {
        getCart();
      });
    } else {
      setTokenStatus(false);
      getCart();
    }
  }, [tokenStatus]);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        getCart,
        isLoading,
        quantity,
        setTokenStatus,
        removeProduct,
        Checkout,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContextProvider;
