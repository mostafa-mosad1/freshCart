import { Outlet } from "react-router-dom";
import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";

function LayOut() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#f8fafc]">
      <NavBar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default LayOut;