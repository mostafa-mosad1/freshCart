import { useContext, useEffect } from "react";
import Button from "../../Components/ui/Button";
import { WishListContext } from "../../Context/WishListContextProvider";
import { CartContext } from "../../Context/CartContextProvider";
import { RingLoader } from "react-spinners";

function WishList() {
  const { GetWishList, allWishLList, DeleteToWishList, isLoading } =
    useContext(WishListContext);
  const { addToCart } = useContext(CartContext);
  useEffect(() => {
    GetWishList();
  }, []);
  return (
    <>
      <div className="parent p-4 bg-gray-100 my-8">
        <h2 className="text-3xl font-semibold font-titleCard">My wish List</h2>
        <div className="wishList">
          {isLoading ? (
            <div className=" flex items-center justify-center h-[400px]">
              <RingLoader
                color="#0aad0a"
                loading
                size={150}
                speedMultiplier={1}
              />
            </div>
          ) : (
            allWishLList?.map((element) => (
              <div
                key={element.id}
                className="card border-b-2 border-white pb-8  mx-4  my-4 flex justify-between  flex-wrap"
              >
                <div className=" flex space-x-4  items-center">
                  <img
                    src={element.imageCover}
                    className=" size-[200px]"
                    alt=""
                  />
                  <div className="flex  items-center justify-between flex-wrap">
                    <div className="">
                      <h3 className="font-titleCard text-lg">
                        {element.category.name}
                      </h3>
                      <h3 className="font-titleCard text-2xl text-mainColor">
                        {element.price} EGP
                      </h3>
                      <Button
                        onClick={() => {
                          DeleteToWishList(element.id);
                        }}
                        className={"text-red-500"}
                        name={"Remove"}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </Button>
                    </div>
                    <Button
                      onClick={() => {
                        addToCart(element.id);
                      }}
                      name={"add to  cart"}
                      className={"border-mainColor border-[2px] text-sm me-4"}
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default WishList;
