import { Outlet } from "react-router-dom";


const Root = () => {
    return (
        <section className="max-w-[1500px] mx-auto">
          <Outlet/>
        </section>
    );
};

export default Root;