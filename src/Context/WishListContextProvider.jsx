/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { axiosBaseUrl } from "../AxiosBaseUrl/AxiosBaseUrl";
import toast from "react-hot-toast";

export const WishListContext = createContext();

function WishListContextProvider({ children }) {
  const [tokenWish, setTokenWish] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [allWishLList, setAllWishList] = useState(null);
  const [allIdList, setAllIdList] = useState([]);

  const headers = {
    token: localStorage.getItem("Token"),
  };
  const AddToWishList = async (id) => {
    try {
      const res = await axiosBaseUrl.post(
        "/wishlist",
        {
          productId: id,
        },
        {
          headers,
        }
      );
      setAllIdList(res.data.data);
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response.data.WishMsg.toUpperCase());
      console.log(err);
    }
  };
  const DeleteToWishList = async (id) => {
    try {
      setIsLoading(true);
      const res = await axiosBaseUrl.delete(`/wishlist/${id}`, {
        headers,
      });
      setAllIdList(res.data.data);
      GetWishList();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  const GetWishList = async () => {
    try {
      setIsLoading(true);
      const res = await axiosBaseUrl.get("/wishlist", {
        headers,
      });
      setAllWishList(res.data.data);
      setAllIdList(res.data.data.map((el) => el.id));
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("Token")) {
      setTokenWish(true);
    } else {
      setTokenWish(false);
      
    }

    if (tokenWish) {
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
        setTokenWish
      }}
    >
      {children}
    </WishListContext.Provider>
  );
}

export default WishListContextProvider;
