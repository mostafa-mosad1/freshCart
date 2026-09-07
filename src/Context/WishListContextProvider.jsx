/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { axiosBaseUrl } from "../AxiosBaseUrl/AxiosBaseUrl";
import toast from "react-hot-toast";

export const WishListContext = createContext();

export function WishListContextProvider({ children }) {
  const [tokenWish, setTokenWish] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [allWishLList, setAllWishList] = useState(null);
  const [allIdList, setAllIdList] = useState([]);

  const getHeaders = () => ({
    token: localStorage.getItem("Token") || "",
  });

  const getGuestWishlist = () => {
    try {
      const stored = localStorage.getItem("guest_wishlist");
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.log(e);
    }
    return [];
  };

  const saveGuestWishlist = (list) => {
    localStorage.setItem("guest_wishlist", JSON.stringify(list));
    setAllWishList(list);
    setAllIdList(list.map((item) => item.id || item._id));
  };

  const syncGuestWishlistToServer = async (authToken) => {
    try {
      const list = getGuestWishlist();
      if (list && list.length > 0) {
        for (const item of list) {
          const pId = item.id || item._id;
          if (pId) {
            await axiosBaseUrl.post(
              "/wishlist",
              { productId: pId },
              { headers: { token: authToken } }
            );
          }
        }
        localStorage.removeItem("guest_wishlist");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const AddToWishList = async (id, productData = null) => {
    const token = localStorage.getItem("Token");
    if (token) {
      try {
        const res = await axiosBaseUrl.post(
          "/wishlist",
          { productId: id },
          { headers: getHeaders() }
        );
        setAllIdList(res.data.data);
        toast.success(res.data.message || "Added to wishlist!");
        GetWishList();
      } catch (err) {
        toast.error(err?.response?.data?.WishMsg?.toUpperCase() || "Failed to add to wishlist");
        console.log(err);
      }
    } else {
      // Guest User
      try {
        let list = getGuestWishlist();
        let productObj = productData;

        if (!productObj || !productObj.title) {
          try {
            const res = await axiosBaseUrl.get(`/products/${id}`);
            productObj = res?.data?.data;
          } catch (e) {
            console.log(e);
          }
        }

        const exists = list.some((item) => (item.id || item._id) === id);
        if (!exists) {
          list.push({
            id: id,
            _id: id,
            title: productObj?.title || "Product",
            price: productObj?.price || 0,
            imageCover: productObj?.imageCover || productObj?.img || "",
            category:
              typeof productObj?.category === "object"
                ? productObj?.category
                : { name: productObj?.category || "Grocery" },
          });
          saveGuestWishlist(list);
          toast.success("تمت الإضافة إلى المفضلة بنجاح!");
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const DeleteToWishList = async (id) => {
    const token = localStorage.getItem("Token");
    if (token) {
      try {
        setIsLoading(true);
        const res = await axiosBaseUrl.delete(`/wishlist/${id}`, {
          headers: getHeaders(),
        });
        setAllIdList(res.data.data);
        GetWishList();
        toast.success("تم الحذف من المفضلة");
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    } else {
      // Guest User
      let list = getGuestWishlist();
      list = list.filter((item) => (item.id || item._id) !== id);
      saveGuestWishlist(list);
      toast.success("تم الحذف من المفضلة");
    }
  };

  const GetWishList = async () => {
    const token = localStorage.getItem("Token");
    if (token) {
      try {
        setIsLoading(true);
        const res = await axiosBaseUrl.get("/wishlist", {
          headers: getHeaders(),
        });
        setAllWishList(res.data.data);
        setAllIdList(res.data.data.map((el) => el.id || el._id));
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    } else {
      const list = getGuestWishlist();
      setAllWishList(list);
      setAllIdList(list.map((item) => item.id || item._id));
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (token) {
      setTokenWish(true);
      syncGuestWishlistToServer(token).then(() => {
        GetWishList();
      });
    } else {
      setTokenWish(false);
      GetWishList();
    }
  }, [tokenWish]);

  return (
    <WishListContext.Provider
      value={{
        isLoading,
        AddToWishList,
        GetWishList,
        allWishLList,
        allIdList,
        DeleteToWishList,
        setTokenWish,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
}

export default WishListContextProvider;
