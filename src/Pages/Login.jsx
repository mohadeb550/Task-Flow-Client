
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast  from "react-hot-toast";
import useAuth from "../Hooks/useAuth";
import { Helmet } from "react-helmet";
import SocialLogin from "../components/Shared/SocialLogin";



export default function Login() {


  const { loginUser  } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || '/'; 


    const handleLogin = (e) => {
        e.preventDefault();

        const form  = new FormData(e.target);
        const email = form.get('email')
        const password = form.get('password')

        loginUser(email, password)
        .then(result => {
                toast.success('Login Successful !',{duration:3000});
                navigate(from);
              
        })
        .catch(error =>  toast.error(error.message))
    }

    

  return(
    <div className="hero h-[600px] pb-32 md:pb-0 md:h-[700px] px-4 bg-base-200 bg-[url('/3752984_1962410.jpg')]">

    <Helmet>
        <title> Task Flow / Login </title>
      </Helmet>
    <div className="hero-content flex-col w-full">

      <div className="text-center lg:text-left">
        <h1 className="text-3xl lg:text-[32px] text-white/90  px-24 py-3 font-bold text-center font-play">Login now!</h1>
      </div>

      <div className="rounded-md flex-shrink-0 w-full max-w-2xl shadow-2xl bg-black/30">
        <div className="p-10">


        <form onSubmit={handleLogin} className="text-white">

          <div className="form-control">
            <label className="label">
              <span className="">Email</span>
            </label>
            <input type="email" placeholder="Email" className="input rounded-sm bg-transparent  border-white/70 focus:border-sky-500 focus:outline-none" name="email" />
          </div>


          <div className="form-control">
            <label className="label">
              <span className="">Password</span>
            </label>
            <input type="text" placeholder="Password" className="input rounded-sm bg-transparent border-white/70 focus:border-sky-500 focus:outline-none" name="password" />
          

            <div className="mt-3">
                <h4 className="text-sm font-semibold text-gray-200"> Don't Have An Account? <Link to='/sign-up'> <span className="-600  hover:underline"> Sign Up </span></Link> </h4>
            </div>

           <SocialLogin/>

          </div>
          <div className="form-control mt-6">
            <button className="bg-gray-300 py-2 px-3 text-[#00719C] rounded font-bold transition-all hover:bg-gray-400 text-sm md:text-base" type="submit"> Login </button>
          </div>
        </form>


        </div>
      </div>
    </div>
  </div>
  )
}
