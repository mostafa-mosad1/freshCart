import GetHook from "../../Hooks/GetHook";
import { RingLoader } from "react-spinners";

function SubCategory({ id, title }) {
  const { isLoading, data } = GetHook({
    queryKey: ["SubCategory", id],
    url: `/categories/${id}/subcategories`,
  });
  console.log(data);
  return (
    <>
      {isLoading ? (
        <div className=" fixed top-0 left-0 w-full">
          <div className="bg-gray-500/50 absolute w-full h-svh flex justify-center items-center">
            <RingLoader
              color="#0aad0a"
              loading
              size={150}
              speedMultiplier={1}
            />
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-4xl font-titleCard text-center text-mainColor">
            {title} subcategories
          </h2>

          <div className=" my-12 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
            {data.data.data.map((cate) => (
              <div
                key={cate._id}
                className="text-2xl border-[2px] border-gray-400 px-8 py-4 hover:shadow-cardShadow  text-center"
              >
                {cate.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default SubCategory;
