import { Outlet } from "react-router-dom";
import Navbar from "../components/Shared/Navbar";
import { Toaster } from "react-hot-toast";


const Root = () => {
    return (
        <section className="max-w-[1500px] mx-auto">
            <Navbar/>
          <Outlet/>
          <Toaster/>
        </section>
    );
};

export default Root;