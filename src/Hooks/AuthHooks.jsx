import { useQuery } from "@tanstack/react-query";
import { axiosBaseUrl } from './../AxiosBaseUrl/AxiosBaseUrl';

function AuthHook({queryKey,url,data}) {
    return  useQuery({
        queryKey,
        queryFn:async ()=>{
        const res = await  axiosBaseUrl.post(url,data);
        return res;
        }
    })
     
}

export default AuthHook;