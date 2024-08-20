import Button from "../../Components/ui/Button";
import paypal from "../../assets/images/paypal.webp";
import google from "../../assets/images/google-play-badge-logo.svg";
import MasterCard from "../../assets/images/mastercard.png";
import amazonpng from "../../assets/images/amazon pay.webp";
import apple from "../../assets/images/apple store.svg";
import express from "../../assets/images/american express.webp";

export default function Footer() {
  return (
    <>
      <div className="bg-gray-300 py-14">
        <div className=" container">
          <h2 className="text-2xl pb-4">Get the FreshCart app</h2>
          <p>
            We will send you a link , open it on your phone to download the app
          </p>
          <div className="my-4 flex md:space-x-4 space-y-4 md:space-y-0 justify-between flex-col md:flex-row  ">
            <input
              name="Email"
              placeholder="Email"
              className="bg-white rounded-md md:w-[80%] h-10 focus: outline-main_color ps-5 text-main_color"
            />
            <Button
              name="Share App link"
              className="bg-mainColor text-white  "
            />
          </div>
          <div className="flex justify-between flex-col md:flex-row space-y-3 md:space-y-0">
            <div className="flex flex-wrap flex-col md:flex-row text-xl font-semibold space-x-2 items-center">
              <p>Payment Partners </p>
              <img src={MasterCard} className="w-20 h-18" alt="logo" />
              <img src={paypal} className="w-20 h-18" alt="logo" />
              <img src={amazonpng} className="w-20 h-18" alt="logo" />
              <img src={express} className="w-28 h-28" alt="logo" />
            </div>
            <div className="flex flex-wrap flex-col md:flex-row text-xl font-semiboldl  space-x-2 items-center">
              <p>Get deliveries with FreshCart</p>
              <img src={apple} className="w-20 h-36" alt="logo" />
              <img src={google} className="w-28 h-24" alt="logo" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
