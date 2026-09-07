import Slider from "react-slick";
import slider1 from "../../assets/images/slider-image-1.jpeg";
import slider2 from "../../assets/images/slider-2.jpeg";
import slider3 from "../../assets/images/slider-image-3.jpeg";
import slider4 from "../../assets/images/grocery-banner.png";
import slider5 from "../../assets/images/grocery-banner-2.jpeg";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

function MinSlider() {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
  };

  const slides = [
    {
      img: slider1,
      badge: "Organic & Fresh 🌿",
      title: "Fresh Groceries Delivered to Your Door",
      desc: "Get fresh fruits, vegetables, and daily essentials with same-day express delivery.",
    },
    {
      img: slider2,
      badge: "Special Discounts 🔥",
      title: "Save Big on Daily Kitchen Essentials",
      desc: "Up to 40% off on premium quality dairy, snacks, and imported staples.",
    },
    {
      img: slider3,
      badge: "Healthy Living 🥑",
      title: "100% Certified Farm-Fresh Products",
      desc: "Carefully sourced from local farms directly to your dining table.",
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 my-6">
      {/* Main Hero Slider (2 cols on desktop) */}
      <div className="lg:col-span-2 overflow-hidden rounded-3xl shadow-sm border border-slate-100 bg-slate-900 relative">
        <Slider {...settings}>
          {slides.map((slide, idx) => (
            <div key={idx} className="relative h-[340px] sm:h-[400px] w-full outline-none">
              <img
                src={slide.img}
                className="w-full h-full object-cover brightness-[0.7]"
                alt="Banner slide"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6 sm:p-10 text-white">
                <span className="inline-flex items-center gap-1.5 bg-emerald-500/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white w-fit mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  {slide.badge}
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold font-heading leading-tight max-w-lg mb-2">
                  {slide.title}
                </h2>
                <p className="text-slate-200 text-xs sm:text-sm max-w-md mb-5 line-clamp-2">
                  {slide.desc}
                </p>
                <Link
                  to="/product"
                  className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md w-fit transition-all active:scale-95"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Side Promo Banners (1 col on desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
        <div className="relative h-[160px] sm:h-[190px] rounded-3xl overflow-hidden shadow-sm border border-slate-100 group">
          <img
            src={slider4}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            alt="Promo 1"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-950/40 to-transparent p-5 flex flex-col justify-center text-white">
            <span className="text-emerald-400 font-bold text-xs uppercase tracking-wider">Weekend Sale</span>
            <h3 className="text-lg font-bold font-heading leading-snug max-w-[180px] mt-1">
              Fresh Bakery & Pastries
            </h3>
            <span className="text-xs text-slate-300 mt-2 font-medium">Up to 25% Off</span>
          </div>
        </div>

        <div className="relative h-[160px] sm:h-[190px] rounded-3xl overflow-hidden shadow-sm border border-slate-100 group">
          <img
            src={slider5}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            alt="Promo 2"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-950/40 to-transparent p-5 flex flex-col justify-center text-white">
            <span className="text-amber-400 font-bold text-xs uppercase tracking-wider">Daily Specials</span>
            <h3 className="text-lg font-bold font-heading leading-snug max-w-[180px] mt-1">
              Pure Dairy & Farm Milk
            </h3>
            <span className="text-xs text-slate-300 mt-2 font-medium">Free Delivery</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MinSlider;

