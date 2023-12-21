
import { Link, NavLink ,useNavigate, } from "react-router-dom";
import toast from "react-hot-toast"
import { useLocation } from "react-router-dom/dist";
import useAuth from "../../Hooks/useAuth";
import { MdOutlineMenu } from "react-icons/md";




export default function Navbar() {
  
  const { currentUser , logOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();




  const navLinks = <>
   <li ><NavLink className={({isActive})=> isActive? ' font-semibold bg-white/10 rounded-sm px-3 py-[3px] ': '' } to='/'> Home </NavLink></li>
   <li ><NavLink className={({isActive})=> isActive? ' font-semibold bg-white/10 rounded-sm px-3 py-[3px] ': '' } to='/dashboard' state={{ from : {location}}} > Dashboard </NavLink></li>


   <li ><NavLink className={({isActive})=> isActive? ' font-semibold bg-white/10 rounded-sm px-3 py-[3px] ': '' } to='/sign-up' state={{ from : {location}}} > Sign Up </NavLink></li>

  </>

    const signOut = () => {
      logOut()
      .then(result => {
        toast.success('Logged Out !')
            navigate('/');  
      })
      .catch(error => {
        toast.error('Something went wrong')
      })
    }

  return (
    <div className={`navbar  flex justify-between md:pt-3 bg-[#00719C]`}>
  <div className="navbar-start z-50" >
    <div className="dropdown z-50">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <MdOutlineMenu size={23} className="text-white/80"/>
      </label>
      <ul tabIndex={0} className={`menu-sm dropdown-content mt-2 p-2 shadow bg-base-200 rounded w-52 font-play `}>
        {navLinks}
      </ul>


    </div>
    <div className="flex items-center gap-1">
    <img src='/pngwing.com (33).png' className="w-9 md:w-12 lg:w-[50px]"/>
    <p className="text-[18px]  md:text-xl lg:text-2xl text-amber-400 font-racing whitespace-nowrap "> Task <span className="text-white/90"> Flow</span> </p>
    </div>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="flex items-center gap-10 menu-horizontal px-1 font-play text-white/80">
      {navLinks}
    </ul>
  </div>




  <div className="dropdown dropdown-end flex items-center justify-center gap-2 z-50">
    
        {!currentUser && <Link to='/login'><button className={`font-semibold text-[#014BA0]  text-sm md:text-[16px] p-1 px-3 rounded-sm bg-gray-50 hover:bg-gray-100 `}> Login </button></Link>}
        
        <div className="z-30 lg:w-10 rounded-lg p-[2px] mr-2">
          {currentUser && <img tabIndex={0} src={currentUser?.photoURL || 'https://i.ibb.co/Ttgtb82/pngwing-com-15.png' } className="dropdown w-8 md:w-9 h-8 md:h-9 object-cover cursor-pointer rounded-lg border border-gray-400 p-[1px]" />}

          {currentUser && 
         <ul tabIndex={0} className={`dropdown-content p-2 shadow bg-base-200 rounded w-52 font-play`}>
          {currentUser && <li className="font-semibold  p-2 border-b rounded text-black/60 flex items-center gap-2"> {currentUser?.displayName || 'User'}  <img tabIndex={0} src={currentUser?.photoURL || 'https://i.ibb.co/Ttgtb82/pngwing-com-15.png' } className="w-8 h-8 object-cover rounded-full border border-gray-300 p-[1px]" /></li>}
            
         
         <Link to='/dashboard' state={{ from : {location}}}> <li className="font-semibold  p-2 transition-all rounded hover:bg-slate-500/10 text-gray-500 text-sm flex items-center gap-2 "> Dashboard  </li></Link>
         <li className="cursor-pointer transition-all text-gray-600 p-1 rounded hover:underline" onClick={()=> signOut() }> Log out</li> 

        </ul>}
        </div>
     
    </div>

</div>
  )
}
