import { FloatingLabel } from "flowbite-react";
import Button from "../../Components/ui/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { registerData } from "../../authData/RegisterData";
import InputErrorMessage from "../../Components/ui/InputErrorMessage";
import { axiosBaseUrl } from "../../AxiosBaseUrl/AxiosBaseUrl";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { TokenContext } from "../../Context/TokenContext";

function Register() {
  const {setToken} =useContext(TokenContext);
  const navgate = useNavigate();
  const schema = yup.object({
    name: yup
      .string()
      .required("Name is required")
      .max(15, "max character is 15")
      .min(5, "min character is 5"),
      email: yup
      .string()
      .email("Enter Valid E-mail")
      .required("Email is required"),
    password: yup
      .string()
      .matches(/^[A-Z]{1}\w{5,15}$/, "Ex:(Ahmed123)")
      .required("Password is required"),
    rePassword: yup
      .string()
      .required()
      .oneOf([yup.ref("password", "password is not equal to repassword")]),
    phone: yup.number().positive().integer().required("phone is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = async (inputsData) => {
    console.log(inputsData);
    try {
      const { data } = await axiosBaseUrl.post("/auth/signup", inputsData);
      localStorage.setItem("Token", data.token);
      navgate("/home");
      setToken(data.token)
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
  const allInputs = registerData.map((element, index) => (
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
      <h1 className="text-4xl font-semibold my-6">Register Now</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto space-y-6 my-4"
      >
        {allInputs}
        <Button
          className={"bg-mainColor text-white w-full lg:w-fit lg:ms-auto"}
          name={"Register"}
          type={"submit"}
          onClick={() => console.log("register")}
        />
      </form>
      <p className="text-center flex items-center justify-center">
        
        have an account?
        <Button
          name={"Login"}
          onClick={() => navgate("/")}
          className={"text-mainColor"}
        />
      </p>
    </>
  );
}

export default Register;
