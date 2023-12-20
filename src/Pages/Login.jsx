
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast  from "react-hot-toast";
import useAuth from "../Hooks/useAuth";
import { Helmet } from "react-helmet";
import SocialLogin from "../Components/Shared/SocialLogin";
import useAxiosSecure from "../Hooks/useAxiosSecure";



export default function Login() {


  const { loginUser  } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure()

  const from = location.state?.from?.pathname || '/'; 


    const handleLogin = (e) => {
        e.preventDefault();

        const form  = new FormData(e.target);
        const email = form.get('email')
        const password = form.get('password')

        loginUser(email, password)
        .then(result => {

          axiosSecure.post('/jwt', { email: result.user.email })
            .then(res => {
              if(res.data.success){
                toast.success('Login Successful !',{duration:3000});
                navigate(from);
              }
            })
        })
        .catch(error =>  toast.error(error.message))
    }


  return(
    <div className="hero h-[600px] pb-32 md:pb-0 md:h-[700px] px-4 bg-base-200 bg-[url('/6674908_3386851.jpg')]">

    <Helmet>
        <title> Rapid Parcel / Login </title>
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
            <input type="email" placeholder="Email" className="input input-bordered bg-transparent  border-white/60" name="email" />
          </div>


          <div className="form-control">
            <label className="label">
              <span className="">Password</span>
            </label>
            <input type="text" placeholder="Password" className="input input-bordered bg-transparent border-white/50" name="password" />
          

            <div className="mt-3">
                <h4 className="text-sm font-semibold text-amber-400"> Don't Have An Account? <Link to='/sign-up'> <span className="-600  hover:underline"> Sign Up </span></Link> </h4>
            </div>

           <SocialLogin/>

          </div>
          <div className="form-control mt-6">
            <button className="bg-blue-600 py-2 px-3 text-gray-100 rounded font-semibold transition-all hover:bg-blue-700 text-sm md:text-base" type="submit"> Login </button>
          </div>
        </form>


        </div>
      </div>
    </div>
  </div>
  )
}
