import { NavLink, Outlet } from "react-router-dom";
import { MdOutlineMenu } from "react-icons/md";
import { FaUserLarge } from "react-icons/fa6";



const Layout = () => {
    return (
        <div className="drawer lg:drawer-open">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col ">

    {/* Page content here */}
   <section className="max-w-[1300px] mx-auto bg-slate-400 flex items-center justify-center mt-14">
   <Outlet/>
   </section>

    <div className="flex justify-start items-start p-4 fixed bg-white shadow-lg w-full xl:static top-0 left-0">
    <label htmlFor="my-drawer-2" className="drawer-button lg:hidden"> <MdOutlineMenu size={24} /> </label>
    </div>
  
  </div> 
  <div className="drawer-side ">
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content pt-10">
      {/* Sidebar content here */}

      <li>
           <NavLink to="/dashboard/profile" className={({isActive})=> isActive? ' flex items-center p-2 t bg-gray-600 text-gray-300 rounded dark:text-white  ': 'flex items-center p-2 text-gray-300 rounded-lg dark:text-white  ' }>
           <FaUserLarge size={22} className="text-gray-400" />
              <span className="flex-1 ms-3 whitespace-nowrap"> My Profile</span>
             
           </NavLink>
        </li>
      
    </ul>
  
  </div>
</div>
    );
};

export default Layout;