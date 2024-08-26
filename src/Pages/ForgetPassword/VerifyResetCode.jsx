import { useState } from 'react';
import { axiosBaseUrl } from './../../AxiosBaseUrl/AxiosBaseUrl';
import { toast } from 'react-hot-toast';
import { FloatingLabel } from 'flowbite-react';
;
import { useNavigate } from 'react-router-dom';
import Button from './../../Components/ui/Button';
function VerifyResetCode() {
    const navgate =    useNavigate()

    const [code, setCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);
  
    const verifyResetCode  = async () => {
      try {
          setIsLoading(true)
        const res = await axiosBaseUrl.post("/auth/verifyResetCode", {
            "resetCode":code
        });
        toast.success(res.data.status)
        console.log(res);
        {res.status == "200" && navgate("/restNewPassword")}

      } catch (err) {
        console.log(err);
        toast.error(err.response.data.message,{
          duration:3000
        })
  
      } finally{
          setIsLoading(false)
      }
    };
    console.log(code);
    return (
      <>
        <div className="h-[400px] space-y-8">
          <h1 className="text-4xl font-semibold  mt-5">
            please enter your verification code
          </h1>
  
          <form className=" space-y-8">
            <FloatingLabel
              variant="filled"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              label="Code"
            />
            <Button
            isLoading={isLoading}
              onClick={(e) => {
                e.preventDefault();
                verifyResetCode();
              }}
              type={"submit"}
              className={
                "text-mainColor border-mainColor border-[2px] mb-20 rounded-md bg-white w-fit hover:bg-mainColor  hover:text-white"
              }
              name={"check Code"}
            />
          </form>
        </div>
      </>
    );
  }

export default VerifyResetCode;