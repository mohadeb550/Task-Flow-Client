import { NavLink, Outlet } from "react-router-dom";
import { MdOutlineMenu } from "react-icons/md";
import { FaHouse, FaUserLarge } from "react-icons/fa6";
import { RiTodoFill } from "react-icons/ri";
import { Toaster } from "react-hot-toast";
import useAuth from "../Hooks/useAuth";



const Layout = () => {

  const { currentUser } = useAuth()

    return (
        <div className="drawer lg:drawer-open">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col">

    {/* Page content here */}
   <section className="max-w-[1500px] mt-14">
   <Outlet/>
   <Toaster/>
   </section>

    <div className="flex justify-start items-start p-4 fixed bg-white w-full xl:static top-0 left-0">
    <label htmlFor="my-drawer-2" className="drawer-button lg:hidden"> <MdOutlineMenu size={24} /> </label>
    </div>
  
  </div> 
  <div className="drawer-side ">
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 


    <ul className="menu p-4 w-80 min-h-full bg-[#00719C] text-base-content pt-10">
      {/* Sidebar content here */}

      <div className="bg-transparent pb-6 flex items-center gap-2">
      {currentUser && <img tabIndex={0} src={currentUser?.photoURL || 'https://i.ibb.co/Ttgtb82/pngwing-com-15.png' } className="dropdown w-8 md:w-9 h-8 md:h-9 object-cover cursor-pointer rounded-full border border-gray-400 p-[1px]" />
      }
      <p className="text-lg text-gray-300 font-semibold"> {currentUser?.displayName} </p>
      </div>

      <li>
           <NavLink to="/dashboard" className={({isActive})=> isActive? ' flex items-center p-2 t bg-gray-200 text-gray-600 rounded  ': 'flex items-center p-2 text-gray-200 rounded-lg ' }>
           <RiTodoFill size={22} className="text-gray-200" />
              <span className="flex-1 ms-3 whitespace-nowrap"> My Tasks</span>
             
           </NavLink>
    </li>

      <li>
           <NavLink to="/dashboard/profile" className={({isActive})=> isActive? ' flex items-center p-2 t bg-gray-200 text-gray-600 rounded   ': 'flex items-center p-2 text-gray-200 rounded-lg  ' }>
           <FaUserLarge size={22} className="text-gray-200" />
              <span className="flex-1 ms-3 whitespace-nowrap"> My Profile</span>
             
           </NavLink>
        </li>
      <li>
           <NavLink to="/" className={({isActive})=> isActive? ' flex items-center p-2 t bg-gray-200 text-gray-600 rounded  ': 'flex items-center p-2 text-gray-200 rounded-lg ' }>
           <FaHouse size={22} className="text-gray-200" />
              <span className="flex-1 ms-3 whitespace-nowrap"> Home </span>
             
           </NavLink>
        </li>
      
    </ul>
  
  </div>
</div>
    );
};

export default Layout;