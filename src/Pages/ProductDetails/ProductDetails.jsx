import { useParams } from "react-router-dom";
import GetHook from "../../Hooks/GetHook";
import Button from "./../../Components/ui/Button";
import Slider from "react-slick";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContextProvider";
import SkeletonDetails from "./../../Skeleton/SkeletonDetails";
import Recomended from './../../Components/Recomended/Recomended';

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  };

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
              <p className="flex items-center">
                <i className="fa-solid fa-star-half-stroke text-rating_color text-xl"></i>
                3.4
              </p>
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
      <Recomended id={"6428eb43dc1175abc65ca0b3"} />
    </>
  );
}

export default ProductDetails;
