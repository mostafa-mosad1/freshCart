import  { useEffect, useState } from "react";
import Slider from "react-slick";
import { axiosBaseUrl } from './../../AxiosBaseUrl/AxiosBaseUrl';

function Recomended({ id }) {
  const [recomende, setRecomended] = useState();
  const getRecomended = async () => {
    const res = await axiosBaseUrl.get(`/products?category=${id}`);
    setRecomended(res.data.data);
  };

  useEffect(() => {
    getRecomended();
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
          {recomende &&
            recomende.map((element, ind) => (
              <div key={ind} className="my-8">
                <img
                  src={element.imageCover}
                  className="h-[200px] w-full"
                  alt={element.name}
                />
                <p className=" line-clamp-1" >{element.title}</p>
              </div>
            ))}
          <div></div>
        </Slider>
      </div>
    </>
  );
}

export default Recomended;
