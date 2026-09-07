import { useState, useRef, useEffect } from "react";
import CardProduct from "../../Components/CardProduct/CardProduct";
import GetHook from "../../Hooks/GetHook";
import MinSlider from "../../Components/MinSlider/MinSlider";
import CategorySlider from "../../Components/CategorySlider/CategorySlider";
import FeaturesBar from "../../Components/HomeSections/FeaturesBar";
import PromoGridBanners from "../../Components/HomeSections/PromoGridBanners";
import DealOfTheDay from "../../Components/HomeSections/DealOfTheDay";
import AppPromoBanner from "../../Components/HomeSections/AppPromoBanner";
import SkeletonHome from "../../Skeleton/SkeletonHome";
import { Search, Sparkles, X, PackageSearch, ChevronLeft, ChevronRight } from "lucide-react";

function Home() {
  const { isLoading, data } = GetHook({
    queryKey: ["products"],
    url: "/products",
    data: {},
    config: {},
  });

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsSectionRef = useRef(null);

  const ITEMS_PER_PAGE = 12;

  const productsList = data?.data?.data || [];
  const allProducts = search
    ? productsList.filter(
        (el) =>
          el.title.toLowerCase().includes(search.toLowerCase()) ||
          el.category?.name?.toLowerCase().includes(search.toLowerCase())
      )
    : productsList;

  // Reset to page 1 on search
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const totalPages = Math.ceil(allProducts.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedProducts = allProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      if (productsSectionRef.current) {
        productsSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Hero Sliders Section */}
      <MinSlider />

      {/* 2. Features Value Proposition Strip */}
      <FeaturesBar />

      {/* 3. Category Carousel */}
      <CategorySlider />

      {/* 4. Seasonal 3-Grid Promotional Banners with Coupon Codes */}
      <PromoGridBanners />

      {/* 5. Deal of the Day with Live Countdown Timer */}
      <DealOfTheDay />

      {/* 6. Products Section Header, Search Bar & 12-Item Grid */}
      <section ref={productsSectionRef} className="space-y-6 pt-6 scroll-mt-24">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Recommended For You</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900">
              Featured Products
            </h2>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80 lg:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products, brands, or groceries..."
              className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-2xl text-sm placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 shadow-xs transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full hover:bg-slate-100"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Loading Skeleton */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, ind) => (
              <SkeletonHome key={ind} />
            ))}
          </div>
        )}

        {/* Product Cards Grid (12 items) */}
        {!isLoading && displayedProducts.length > 0 && (
          <>
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-1">
              <span>
                Showing <strong className="text-slate-800">{startIndex + 1} - {Math.min(startIndex + ITEMS_PER_PAGE, allProducts.length)}</strong> of <strong className="text-slate-800">{allProducts.length}</strong> products
              </span>
              <span>
                Page <strong className="text-emerald-600">{currentPage}</strong> of <strong className="text-slate-800">{totalPages}</strong>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {displayedProducts.map((product) => (
                <CardProduct
                  key={product.id || product._id}
                  img={product.imageCover}
                  id={product.id || product._id}
                  title={product.title}
                  price={product.price}
                  category={product.category?.name}
                  ratingsAverage={product.ratingsAverage}
                />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-8 pb-4">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1 px-4 py-2.5 rounded-2xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-xs"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <div className="flex items-center gap-1.5 mx-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`h-9 w-9 rounded-xl text-xs font-bold transition-all ${
                        currentPage === pageNum
                          ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20 scale-105"
                          : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300"
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-1 px-4 py-2.5 rounded-2xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-xs"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}

        {/* Empty Search Result State */}
        {!isLoading && allProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-white rounded-3xl border border-slate-100 shadow-xs my-8">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4">
              <PackageSearch className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">No Products Found</h3>
            <p className="text-slate-500 text-sm mt-1 max-w-sm">
              We couldn&#39;t find any items matching &quot;{search}&quot;. Try searching with a different keyword.
            </p>
            <button
              onClick={() => setSearch("")}
              className="mt-4 text-emerald-600 hover:text-emerald-700 text-xs font-bold uppercase tracking-wider underline"
            >
              Clear Search Filter
            </button>
          </div>
        )}
      </section>

      {/* 7. VIP App Promo Banner */}
      <AppPromoBanner />
    </div>
  );
}

export default Home;



