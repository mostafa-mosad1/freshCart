import CardProduct from "../../Components/CardProduct/CardProduct";
import SkeletonHome from "../../Skeleton/SkeletonHome";
import GetHook from "./../../Hooks/GetHook";
function Products() {
  const { isLoading, data } = GetHook({
    queryKey: ["products"],
    url: "/products",
    data: {},
    config: {},
  });
  return (
    <>
      {isLoading && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 my-10 space-y-4">
          {Array.from({ length: 10 }, (_, ind) => (
            <SkeletonHome key={ind} />
          ))}
        </div>
      )}
      <div className=" grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data &&
          data.data.data.map((product) => (
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
