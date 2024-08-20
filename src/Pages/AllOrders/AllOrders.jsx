import { useContext, useEffect } from "react";
import { CartContext } from "../../Context/CartContextProvider";

function AllOrders() {
const {clearCart} =   useContext(CartContext);

useEffect(()=>{
    clearCart()
},[])
    return (
        <>
            <h1 className="bg-mainColor text-white my-36 w-fit mx-auto px-10 rounded-md py-4 text-center" >Done</h1>
        </>
    )
}

export default AllOrders;