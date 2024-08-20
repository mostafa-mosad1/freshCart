import GetHook from "../../Hooks/GetHook";
import { RingLoader } from "react-spinners";
import SubBrand from "./SubBrand";
import { useState } from "react";

function Brand() {
  const [isOpen, setIsOpen] = useState(false);
  const [cardId, setCardId] = useState(false);

  const { data, isLoading } = GetHook({
    queryKey: ["Brand"],
    url: `/brands`,
    select: (data) => data.data.data,
  });
  return (
    <>
      {cardId && <SubBrand id={cardId} isOpen={isOpen} setIsOpen={setIsOpen} />}
      {isLoading ? (
        <div className=" flex items-center justify-center h-[400px]">
          <RingLoader color="#0aad0a" loading size={150} speedMultiplier={1} />
        </div>
      ) : (
        <div className="my-12 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {data.map((brand) => (
            <div
              onClick={() => {
                setIsOpen(true);
                setCardId(brand._id);
              }}
              className="pb-4   hover:shadow-cardShadow"
              key={brand._id}
            >
              <img
                src={brand.image}
                className="h-[150px] w-full "
                alt="image"
              />
              <h2 className="text-center  font-semibold text-2xl font-titleCard text-mainColor ">
                {brand.name}
              </h2>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Brand;

{
  /* <div className=" flex items-center justify-center h-[400px]">
  <RingLoader color="#0aad0a" loading size={150} speedMultiplier={1} />
</div>; */
}
