import { useState } from "react";
import CardProduct from "../../Components/CardProduct/CardProduct";
import SkeletonHome from "../../Skeleton/SkeletonHome";
import GetHook from "./../../Hooks/GetHook";
import { FloatingLabel } from 'flowbite-react';
function Products() {
  const { isLoading, data } = GetHook({
    queryKey: ["products"],
    url: "/products",
    data: {},
    config: {},
  });
  let [search, setSearch] = useState(null);
  const searchHandler = (e) => {
    console.log(e.target.value);
    setSearch(e.target.value);
  };

  const allProducts = search
    ? data.data.data.filter((el) =>
        el.title.toLowerCase().includes(search.toLowerCase())
      )
    : data?.data.data;
  return (
    <>
      <form className="my-10" action="">
        <FloatingLabel
          variant="filled"
          label={"Search....."}
          onChange={searchHandler}
        />
      </form>

      {isLoading && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 my-10 space-y-4">
          {Array.from({ length: 10 }, (_, ind) => (
            <SkeletonHome key={ind} />
          ))}
        </div>
      )}
      <div className=" grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {allProducts &&
         allProducts.map((product) => (
            <CardProduct
              key={product.id}
              img={product.imageCover}
              id={product.id}
              title={product.title}
              price={product.price}
              category={product.category.name}
            />
          ))}
      </div>
    </>
  );
}

export default Products;
