import { FloatingLabel } from "flowbite-react";
import { useForm } from "react-hook-form";
import Button from "../../Components/ui/Button";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContextProvider";

function CheckOut() {
 const {Checkout} =  useContext(CartContext)
  const { register, handleSubmit } = useForm();
  const onSubmit = async (inputsData) => {
    console.log(inputsData);
    Checkout(inputsData)
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto space-y-6 my-10 "
      >
        <FloatingLabel
          {...register("details")}
          variant="filled"
          label={"Details"}
        />
        <FloatingLabel
          {...register("phone")}
          variant="filled"
          label={"phone"}
        />
        <FloatingLabel {...register("city")} variant="filled" label={"City"} />
      <Button name={"Payment"} className={"bg-mainColor w-full md:w-fit text-white ms-auto"} />
      </form>
    </>
  );
}

export default CheckOut;
