import { useParams } from "react-router-dom";
import GetHook from "../../Hooks/GetHook";
import Button from "./../../Components/ui/Button";
import Slider from "react-slick";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContextProvider";
import SkeletonDetails from "./../../Skeleton/SkeletonDetails";
import { WishListContext } from './../../Context/WishListContextProvider';

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const { AddToWishList,allIdList } = useContext(WishListContext);


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  };
  const status = allIdList.includes(id) ? "red" : "black";

  const { isLoading, data } = GetHook({
    queryKey: ["specificProduct"],
    url: `/products/${id}`,
  });
  console.log(data?.data.data);
  return (
    <>
      {isLoading ? (
        <SkeletonDetails />
      ) : (
        <div className="w-full my-10 mx-auto flex flex-col lg:flex-row justify-center items-center lg:space-x-4 space-y-8 lg:*:space-y-0  ">
          <div className="w-4/12">
            {data.data.data && (
              <div className="slider-container">
                <Slider {...settings}>
                  {data?.data.data.images.map((ele, ind) => (
                    <img
                      src={ele}
                      key={ind}
                      className="w-full  size-[300px] "
                      alt=""
                    />
                  ))}
                </Slider>
              </div>
            )}
            {/* <img src={data?.data.data.imageCover} className="w-full" alt="" /> */}
          </div>
          <div className="w-8/12 flex flex-col gap-4 ">
            <h2 className="text-2xl font-semibold">{data?.data.data.title}</h2>
            <h2 className="text-2xl ms-2 text-gray-500">
              {data?.data.data.description}
            </h2>
            <h2 className="text-2xl font-sans">
              {data?.data.data.category.name}
            </h2>
            <div className=" flex justify-between">
              <p className="text-2xl font-semibold">
                {data?.data.data.price} EGP
              </p>
             <div className=" flex  flex-wrap gap-4">
             <i
            style={{ color: status }}
            onClick={() => {
              AddToWishList(id);
            }}
            className="fa-solid fa-heart text-2xl  cursor-pointer"
          ></i>
              <p className="flex items-center">
                <i className="fa-solid fa-star-half-stroke text-rating_color text-xl"></i>
                3.4
              </p>
             </div>
            </div>
            <Button
              type={"submit"}
              onClick={() => addToCart(id)}
              name="add to cart"
              className="w-full bg-mainColor text-white "
            />
          </div>
        </div>
      )}
      
    </>
  );
}

export default ProductDetails;
