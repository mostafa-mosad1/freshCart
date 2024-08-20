import Button from "./../../Components/ui/Button";
import GetHook from "./../../Hooks/GetHook";
function SubBrand({ id, isOpen, setIsOpen }) {
  const { data } = GetHook({
    queryKey: ["brans", id],
    url: `/brands/${id}`,
    select: (data) => data.data.data,
  });

  return (
    <>
      {isOpen && (
        <div className="flex justify-center items-center flex-col">
          <div
            onClick={() => setIsOpen(false)}
            className="w-full h-full bg-gray-500/50  fixed inset-0"
          ></div>
          <div className="border-gray-500 w-2/4 fixed top-[20%]   bg-white  rounded-md border-[2px] p-5">
            <div className="ms-auto relative ">
              <i
                onClick={() => setIsOpen(false)}
                className="fa-regular fa-circle-xmark  text-4xl text-red-500  absolute top-0 right-0"
              ></i>
            </div>
            <div className="flex justify-center space-x-4 items-center flex-wrap overflow-hidden ">
              <div className="">
                <h2 className="text-4xl font-bold font-titleCard text-mainColor">
                  {data?.name}
                </h2>
                <h2 className="text-xl ">{data?.slug}</h2>
              </div>
              <img src={data?.image} alt="" />
            </div>
            <Button
              onClick={() => setIsOpen(false)}
              className={"ms-auto bg-gray-700 text-white"}
              name={"cancel"}
            />
          </div>
        </div>
      )}
    </>
  );
}
export default SubBrand;


