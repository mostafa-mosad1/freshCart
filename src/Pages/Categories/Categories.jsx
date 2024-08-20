import { useState } from "react";
import GetHook from "../../Hooks/GetHook";
import SkeletonCategoies from "../../Skeleton/SkeletonCategoies";
import SubCategory from "./SubCategory";

function Categories() {
  const [title, setTitle] = useState();
  const [id, setId] = useState();
  const { isLoading, data } = GetHook({
    queryKey: ["gategory"],
    url: `/categories`,
    select: (data) => data?.data.data,
  });

  //   console.log(data);

  return (
    <>
      {isLoading ? (
        <div className=" my-12 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
          {Array.from({ length: 10 }, (_, index) => (
            <SkeletonCategoies key={index} />
          ))}
        </div>
      ) : (
        <div className=" my-12 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
          {data?.map((category) => (
            <div
              onClick={() => {
                setTitle(category.name);
                setId(category._id);
              }}
              className="pb-4  hover:shadow-cardShadow"
              key={category._id}
            >
              <img
                src={category.image}
                className="h-[400px] w-full "
                alt="image"
              />
              <h2 className="text-center py-4 font-semibold text-2xl font-titleCard text-mainColor ">
                {category.name}
              </h2>
            </div>
          ))}
        </div>
      )}

      {title && id ? <SubCategory id={id} title={title} /> : ""}
    </>
  );
}

export default Categories;
