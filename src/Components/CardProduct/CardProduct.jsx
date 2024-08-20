/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import Button from "./../../Components/ui/Button";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContextProvider";
import { WishListContext } from "../../Context/WishListContextProvider";
function CardProduct({ img, title, category, price, id }) {
  const navigate = useNavigate();
  const { addToCart, isLoading } = useContext(CartContext);
  const { AddToWishList, allIdList } = useContext(WishListContext);

  const status = allIdList.includes(id) ? "red" : "black";

  return (
    <>
      <div className=" mx-2 pb-8   mb-5 relative group overflow-hidden cursor-pointer hover:shadow-cardShadow  duration-500 ">
        <div
          onClick={() => {
            console.log("card");
            navigate(`/ProductDetails/${id}`);
          }}
        >
          <img src={img} className="w-full" alt="log" />
          <div className="px-2 space-y-2">
            <h2 className="text-main_color font-semibold text-lg">
              {category}
            </h2>
            <h2 className=" line-clamp-1 text-xl  font-bold">{title}</h2>
            <div className=" flex justify-between">
              <p>{price} EGP</p>
              <p className="flex items-center">
                <i className="fa-solid fa-star-half-stroke text-rating_color text-xl"></i>
                3.4
              </p>
            </div>
          </div>
        </div>
        <div className=" relative mx-2 mt-4 text-center ">
          <Button
            isLoading={isLoading}
            type={"submit"}
            name="Add to Cart"
            className="bg-mainColor w-[80%]  relative -bottom-28 group-hover:bottom-0 duration-1000   text-white  "
            onClick={() => {
              addToCart(id);
            }}
          />

          <i
            style={{ color: status }}
            onClick={() => {
              AddToWishList(id);
            }}
            className="fa-solid fa-heart text-4xl  absolute bottom-0 right-0 "
          ></i>
        </div>
      </div>
    </>
  );
}

export default CardProduct;
