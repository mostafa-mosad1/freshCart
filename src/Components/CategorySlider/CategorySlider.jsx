import { useEffect, useState } from "react";
import Slider from "react-slick";
import { axiosBaseUrl } from "../../AxiosBaseUrl/AxiosBaseUrl";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

function CategorySlider() {
  const [cate, setCate] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getCategories = async () => {
    try {
      setIsLoading(true);
      const res = await axiosBaseUrl.get("/categories");
      setCate(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 600,
    slidesToShow: 6,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 3500,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="my-10">
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Explore Collections</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-heading text-slate-800">
            Popular Categories
          </h3>
        </div>
        <Link
          to="/categoies"
          className="text-xs sm:text-sm font-semibold text-emerald-600 hover:text-emerald-700 hover:underline"
        >
          View All Categories →
        </Link>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-44 bg-slate-100 rounded-3xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="category-slider-wrapper -mx-2">
          <Slider {...settings}>
            {cate &&
              cate.map((element) => (
                <div key={element._id || element.id} className="px-2 outline-none">
                  <Link
                    to="/product"
                    className="group flex flex-col items-center p-4 bg-white rounded-3xl border border-slate-100 shadow-xs hover:shadow-lg hover:border-emerald-200 transition-all duration-300 block text-center"
                  >
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-slate-50 mb-3 flex items-center justify-center p-2">
                      <img
                        src={element.image}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                        alt={element.name}
                      />
                    </div>
                    <p className="font-semibold text-xs sm:text-sm text-slate-700 group-hover:text-emerald-600 line-clamp-1 transition-colors">
                      {element.name}
                    </p>
                  </Link>
                </div>
              ))}
          </Slider>
        </div>
      )}
    </section>
  );
}

export default CategorySlider;

