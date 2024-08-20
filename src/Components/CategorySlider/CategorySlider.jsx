import  { useEffect, useState } from "react";
import Slider from "react-slick";
import { axiosBaseUrl } from "../../AxiosBaseUrl/AxiosBaseUrl";

function CategorySlider() {
  const [cate, setCate] = useState();
  const getCategories = async () => {
    const res = await axiosBaseUrl.get("/categories");

    setCate(res.data.data);
  };

  useEffect(() => {
    getCategories();
  }, []);

  var categories = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    autoplay: true,
  };

  return (
    <>
      <div className="slider-container">
        <Slider {...categories}>
          {cate &&
            cate.map((element, ind) => (
              <div key={ind} className="my-8">
                <img
                  src={element.image}
                  className="h-40 w-full"
                  alt={element.name}
                />
                <p>{element.name}</p>
              </div>
            ))}
          <div></div>
        </Slider>
      </div>
    </>
  );
}

export default CategorySlider;
