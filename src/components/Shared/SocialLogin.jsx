import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";



export default function SocialLogin() {

    const { loginWithGoogle} = useAuth();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/'; 

    const googleLogin = () => {

        loginWithGoogle()
         .then(result => {
         
            axiosPublic.post('/users', {
              name: result.user?.displayName,
             email: result.user.email,
             image: result.user?.photoURL,
             profession:'corporate'
            })
            .then(res => {
      
              if(res.data._id || res.data.message === 'Exist'){

                toast.success('Login Successful !',{duration:3000});
                navigate(from);
              }
            })
         })
         .catch(error => {
            console.log(error)
             toast.error('Something went wrong!')
         })
     }

  return (
    <section>
           <div className="flex flex-col justify-evenly gap-3 mt-4 ">
                <div onClick={googleLogin} className="py-3 px-2 bg-black/30 rounded flex gap-1 items-center justify-center hover:bg-black/20 cursor-pointer" > <FcGoogle className="text-2xl"/> <p className="text-sm font-semibold text-slate-300">Sign In Google</p> </div>
            </div>
    </section>
  )
}
