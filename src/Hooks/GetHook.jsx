import { axiosBaseUrl } from './../AxiosBaseUrl/AxiosBaseUrl';
import { useQuery } from '@tanstack/react-query';
function GetHook({queryKey,url,data,config,select}) {
    return   useQuery({
        queryKey,
        queryFn: async () => {
          return await axiosBaseUrl.get(url,data,config );
        },
        select
      });
}

export default GetHook;