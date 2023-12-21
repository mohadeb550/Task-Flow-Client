import { Outlet } from "react-router-dom";
import Navbar from "../components/Shared/Navbar";


const Root = () => {
    return (
        <section className="max-w-[1500px] mx-auto">
            <Navbar/>
          <Outlet/>
        </section>
    );
};

export default Root;