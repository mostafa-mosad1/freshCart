import { useState, useMemo, useEffect } from "react";
import CardProduct from "../../Components/CardProduct/CardProduct";
import SkeletonHome from "../../Skeleton/SkeletonHome";
import GetHook from "../../Hooks/GetHook";
import { Search, SlidersHorizontal, X, PackageSearch, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

function Products() {
  const { isLoading, data } = GetHook({
    queryKey: ["products"],
    url: "/products",
    data: {},
    config: {},
  });

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 12;

  const rawProducts = data?.data?.data || [];

  const filteredProducts = useMemo(() => {
    let result = [...rawProducts];

    if (search.trim()) {
      result = result.filter(
        (el) =>
          el.title.toLowerCase().includes(search.toLowerCase()) ||
          el.category?.name?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => (b.ratingsAverage || 0) - (a.ratingsAverage || 0));
    }

    return result;
  }, [rawProducts, search, sortBy]);

  // Reset to page 1 on search or sort change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 180, behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 to-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-lg">
        <div className="relative z-10 max-w-xl">
          <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2">
            <Sparkles className="w-3.5 h-3.5" /> All Products
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading tracking-tight">
            Explore Our Catalog
          </h1>
          <p className="text-slate-300 text-sm mt-2">
            Browse through hundreds of organic groceries, fresh pantry staples, and beverages.
          </p>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-xs">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort & Count */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <span className="text-xs font-semibold text-slate-500">
            {filteredProducts.length} Items Found
          </span>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-slate-400 hidden sm:block" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-50 border border-slate-200/80 text-slate-700 text-xs font-semibold rounded-xl px-3 py-2.5 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="default">Sort by: Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
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

      {/* Products Grid */}
      {!isLoading && displayedProducts.length > 0 && (
        <>
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-1">
            <span>
              Showing <strong className="text-slate-800">{startIndex + 1} - {Math.min(startIndex + ITEMS_PER_PAGE, filteredProducts.length)}</strong> of <strong className="text-slate-800">{filteredProducts.length}</strong> items
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

      {/* Empty State */}
      {!isLoading && filteredProducts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-white rounded-3xl border border-slate-100 shadow-xs my-8">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4">
            <PackageSearch className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">No Products Matching Filter</h3>
          <p className="text-slate-500 text-sm mt-1 max-w-sm">
            Try adjusting your search criteria or clearing filters.
          </p>
          <button
            onClick={() => {
              setSearch("");
              setSortBy("default");
            }}
            className="mt-4 text-emerald-600 hover:text-emerald-700 text-xs font-bold uppercase tracking-wider underline"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default Products;


