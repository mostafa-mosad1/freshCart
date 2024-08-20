import { useContext } from 'react';
import { TokenContext } from './../../Context/TokenContext';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { axiosBaseUrl } from './../../AxiosBaseUrl/AxiosBaseUrl';
import { toast } from 'react-hot-toast';
import { FloatingLabel } from 'flowbite-react';
import InputErrorMessage from './../../Components/ui/InputErrorMessage';
import { restNewPassword } from '../../authData/restNewPassword';
import * as yup from "yup";
import Button from "../../Components/ui/Button";

function RestNewPassword() {
    const { setToken,getCart } = useContext(TokenContext);
    const navgate = useNavigate();
    const schema = yup.object({
      email: yup.string().required("email is required").email("not vaild email"),
      newPassword: yup.string().required(),
    });
  
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });
    const onSubmit = async (inputsData) => {
      console.log(inputsData);
      try {
        const { data } = await axiosBaseUrl.put("/auth/resetPassword", inputsData);
        console.log(data)
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
    const allInputs = restNewPassword.map((element, index) => (
      <div key={index}>
        <FloatingLabel
          {...register(element.id)}
          variant="filled"
          label={element.label}
        />
        <InputErrorMessage msg={errors[element.id]?.message} />
      </div>
    ));
    return (
      <>
        <h1 className="text-4xl font-semibold my-6">Reset Password Now</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto space-y-6 my-4"
        >
          {allInputs}
          <div className="flex flex-col lg:flex-row lg:justify-between items-center">
  
          <Button
            className={" hover:text-mainColor text-black w-full lg:w-fit "}
            name={"forget your password ?"}
           
            onClick={() => navgate("ForgetPassword")}
          />
          <Button
            className={"bg-mainColor text-white w-full lg:w-fit "}
            name={"Login"}
            type={"submit"}
            onClick={() => getCart}
          />
          </div>
        </form>

      </>
    );
  }
export default RestNewPassword;