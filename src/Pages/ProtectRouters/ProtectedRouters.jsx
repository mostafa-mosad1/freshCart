/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

function ProtectedRouters({children}) {
  
    if(localStorage.getItem("Token")){
        return children;
    }else{
        return <Navigate to={"/"}/>
    }
 
}

export default ProtectedRouters;