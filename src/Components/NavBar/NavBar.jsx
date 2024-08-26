import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import logo from "../../assets/images/freshcart-logo.svg";
import { TokenContext } from "../../Context/TokenContext";
import { ShoppingCart } from "lucide-react";
import { CartContext } from "../../Context/CartContextProvider";
function Navbar() {
  const navgate = useNavigate();
  const { token, setToken } = useContext(TokenContext);
  const { cart } = useContext(CartContext);
  let [open, setOpen] = useState(false);
  let [heightNav, setHeightNav] = useState("p-[15px]");

  (function nav() {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setHeightNav("p-[2px]");
      } else {
        setHeightNav("p-[15px]");
      }
    });
  })();

  const Logout = () => {
    localStorage.removeItem("Token");
    navgate("/");
    setToken(null);
    cart.numOfCartItems = " ";
  };

  return (
    <div className=" w-full bg-gray-200 sticky top-0 left-0 z-[1000] ">
      <div className={`container mx-auto  duration-[1s] ${heightNav}   ] `}>
        <div className="pc hidden lg:flex  flex-col lg:flex-row justify-between items-center text-black/50 p-4">
          <div className="flex space-x-2 items-center">
            <img src={logo} alt="logo" />
            {token && (
              <ul className=" text-xl space-x-4 font-semibold hidden lg:block">
                <NavLink to={"home"}>Home</NavLink>
                <NavLink to={"WishList"}>Favourite</NavLink>
                <NavLink to={"product"}>Products</NavLink>
                <NavLink to={"categoies"}>Categoies</NavLink>
                <NavLink to={"brand"}>Brand</NavLink>
              </ul>
            )}
          </div>

          <ul className=" lg:flex flex-row  hidden ">
            <div className="icons text-black flex space-x-2 text-lg">
              <Link to={"cart"}>
                <li className="mx-4 text-xl font-semibold text-mainColor relative">
                  <p className="text-3xl font-semibold text-red-500 absolute -top-6 -right-2">
                    {cart?.numOfCartItems}
                  </p>
                  <ShoppingCart className="text-4xl size-8" />
                </li>
              </Link>
              <li>
                <i className="fa-brands fa-facebook"></i>
              </li>
              <li>
                <i className="fa-brands fa-twitter"></i>
              </li>
              <li>
                <i className="fa-brands fa-linkedin-in"></i>
              </li>
              <li>
                <i className="fa-brands fa-youtube"></i>
              </li>
              <li>
                <i className="fa-brands fa-tiktok"></i>
              </li>
              <li>
                <i className="fa-brands fa-instagram"></i>
              </li>
            </div>
            {!token && (
              <>
                <li>
                  <NavLink
                    className={"text-xl font-semibold ps-2"}
                    to={""}
                    onClick={() => {
                      console.log("login");
                    }}
                  >
                    login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={"text-xl font-semibold ps-2"}
                    to={"register"}
                    onClick={() => {
                      console.log("Rgister");
                    }}
                  >
                    Rgister
                  </NavLink>
                </li>
              </>
            )}
            {token && (
              <li className="p-1">
                <span
                  className={"text-xl font-semibold ps-2 cursor-pointer"}
                  onClick={() => {
                    console.log("LogOut");
                    Logout();
                  }}
                >
                  LogOut
                </span>
              </li>
            )}
          </ul>
        </div>

        <div className="mobile lg:hidden  text-black/50 p-4">
          <div className="flex justify-between items-center">
            <img src={logo} alt="logo" />
            <div className=" flex items-center justify-center mx-2">
              <Link to={"cart"}>
                <li className=" flex mx-4 font-semibold text-mainColor relative">
                  <ShoppingCart />
                  <p className=" absolute -top-4 text-xl -right-2 text-red-500 ">
                    {cart?.numOfCartItems}
                  </p>
                </li>
              </Link>
              <i
                onClick={() => setOpen(!open)}
                className="fa-solid fa-bars"
              ></i>
            </div>
          </div>

          {open && (
            <div className="flex flex-col justify-center items-center duration-[2s]">
              {token && (
                <ul className="flex flex-col text-xl  font-semibold ">
                  <NavLink to={"home"}>Home</NavLink>
                  <NavLink to={"WishList"}>Favourite</NavLink>
                  <NavLink to={"product"}>Products</NavLink>
                  <NavLink to={"categoies"}>Categoies</NavLink>
                  <NavLink to={"brand"}>Brand</NavLink>
                </ul>
              )}
              <div className="icons text-black flex space-x-2 my-2 text-lg">
                <i className="fa-brands fa-facebook"></i>

                <i className="fa-brands fa-twitter"></i>

                <i className="fa-brands fa-linkedin-in"></i>

                <i className="fa-brands fa-youtube"></i>

                <i className="fa-brands fa-tiktok"></i>

                <i className="fa-brands fa-instagram"></i>
              </div>
              <ul className="  ">
                {!token && (
                  <>
                    <li>
                      <NavLink
                        className={"text-xl font-semibold ps-2"}
                        to={""}
                        onClick={() => {
                          console.log("login");
                        }}
                      >
                        Login
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className={"text-xl font-semibold ps-2"}
                        to={"register"}
                        onClick={() => {
                          console.log("Rgister");
                        }}
                      >
                        Rgister
                      </NavLink>
                    </li>
                  </>
                )}
                {token && (
                  <li className="p-1 cursor-pointer">
                    <p
                      className={"text-xl font-semibold ps-1"}
                      onClick={() => {
                        Logout();
                        console.log("LogOut");
                      }}
                    >
                      LogOut
                    </p>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;

// git remote add origin https://github.com/mostafa-mosad1/freshCart.git