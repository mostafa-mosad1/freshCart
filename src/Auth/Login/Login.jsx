import { useNavigate } from "react-router-dom";
import { FloatingLabel } from "flowbite-react";
import Button from "../../Components/ui/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputErrorMessage from "../../Components/ui/InputErrorMessage";
import { axiosBaseUrl } from "../../AxiosBaseUrl/AxiosBaseUrl";
import toast from "react-hot-toast";
import { LoginData } from "../../authData/LoginData";
import { useContext } from "react";
import { TokenContext } from "../../Context/TokenContext";
import { CartContext } from "./../../Context/CartContextProvider";
import { WishListContext } from "../../Context/WishListContextProvider";
function Login() {
  const { setToken } = useContext(TokenContext);

  const { setTokenWish } = useContext(WishListContext);
  const { setTokenStatus } = useContext(CartContext);

  const navgate = useNavigate();
  const schema = yup.object({
    email: yup
      .string()
      .email("Enter Valid E-mail")
      .required("Email is required"),
    password: yup
      .string()
      // .matches(/^[A-Z]{1}\w{5,15}$/, "Ex:(Ahmed123)")
      .required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = async (inputsData) => {
    console.log(inputsData);
    try {
      const { data } = await axiosBaseUrl.post("/auth/signin", inputsData);
      localStorage.setItem("Token", data.token);
      navgate("/home");
      setToken(data.token);
      if(data.message =="success"){
        setTokenStatus(true);
        setTokenWish(true)
      }
     console.log(data)
      toast.success(data.message, {
        duration: 4000,
        position: "top-center",
      });
    } catch (err) {
      console.log(err);
      toast.error(err?.response.data.message, {
        duration: 4000,
        position: "top-center",
      });
    }
  };
  const allInputs = LoginData.map((element, index) => (
    <div key={index}>
      <FloatingLabel
      type={element.type}
        {...register(element.id)}
        variant="filled"
        label={element.label}
      />
      <InputErrorMessage msg={errors[element.id]?.message} />
    </div>
  ));

  return (
    <>
      <h1 className="text-4xl font-semibold my-6">Login Now</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto space-y-6 my-4"
      >
        {allInputs}
        <div className="flex flex-col lg:flex-row lg:justify-between items-center">
          <Button
          type={"button"}
            className={" hover:text-mainColor text-black w-full lg:w-fit "}
            name={"forget your password ?"}
            onClick={() => navgate("ForgetPassword")}
          />
          <Button
            className={"bg-mainColor text-white w-full lg:w-fit "}
            name={"Login"}
            type={"submit"}
          />
        </div>
      </form>
      <p className="text-center flex items-center justify-center">
        Don't have an account?
        <Button
          name={"Register"}
          onClick={() => navgate("/register")}
          className={"text-mainColor"}
        />
      </p>
    </>
  );
}
export default Login;
