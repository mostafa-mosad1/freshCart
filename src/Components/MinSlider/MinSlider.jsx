import React from "react";
import Slider from "react-slick";
import slider1 from "../../assets/images/slider-image-1.jpeg";
import slider2 from "../../assets/images/slider-2.jpeg";
import slider3 from "../../assets/images/slider-image-3.jpeg";
import slider4 from "../../assets/images/grocery-banner.png";
import slider5 from "../../assets/images/grocery-banner-2.jpeg";
function MinSlider() {
  var settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <>
      <div className="flex w-full">
        <div className="w-3/4">
          <div className="slider-container">
            <Slider {...settings}>
              <img src={slider1} className="w-full h-[400px]" alt="slider" />
              <img src={slider2} className="w-full h-[400px]" alt="slider" />
              <img src={slider3} className="w-full h-[400px]" alt="slider" />
            </Slider>
          </div>
        </div>
        <div className="w-1/4">
          <img src={slider4} className="w-full h-[200px]" alt="image" />
          <img src={slider5} className="w-full h-[200px]" alt="image" />
        </div>
      </div>
    </>
  );
}

export default MinSlider;
