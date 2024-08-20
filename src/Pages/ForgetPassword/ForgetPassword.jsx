import { memo, useState } from "react";
import Button from "../../Components/ui/Button";
import { FloatingLabel } from "flowbite-react";
import { axiosBaseUrl } from "../../AxiosBaseUrl/AxiosBaseUrl";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function ForgetPassword() {
const navgate =    useNavigate()
  const [mail, setMail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const verification = async () => {
    try {
        setIsLoading(true)
      const res = await axiosBaseUrl.post("/auth/forgotPasswords", {
        email: mail,
      });
      toast.success(res.data.message)
      console.log(res);
      navgate("/verifyResetCode")
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message,{
        duration:3000
      })

    } finally{
        setIsLoading(false)
    }
  };
  console.log(mail);
  return (
    <>
      <div className=" space-y-8">
        <h1 className="text-4xl font-semibold  mt-5">
          please enter your verification code
        </h1>

        <form className=" space-y-8">
          <FloatingLabel
            variant="filled"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            label="Email"
          />
          <Button
          isLoading={isLoading}
            onClick={(e) => {
              e.preventDefault();
              verification();
            }}
            type={"submit"}
            className={
              "text-mainColor border-mainColor border-[2px] mb-10 rounded-md bg-white w-fit hover:bg-mainColor  hover:text-white"
            }
            name={"Verify"}
          />
        </form>
      </div>
    </>
  );
}

export default memo(ForgetPassword);
