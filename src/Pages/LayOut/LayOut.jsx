import { Outlet } from "react-router-dom";
import NavBar from "../../Components/NavBar/NavBar";
import Footer from './../../Components/Footer/Footer';


function LayOut() {
    



 

    return (
        <>
            <NavBar/>
            <div className=" container">
            <Outlet></Outlet>
            </div>
            <Footer/>                                                                                                                                                                                                                             
        </>
    )
}

export default LayOut;