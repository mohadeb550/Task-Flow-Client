
import { Link, useNavigate } from "react-router-dom";

import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../Hooks/useAxiosPublic.jsx";
import SocialLogin from "../Components/Shared/SocialLogin.jsx";
import toast from "react-hot-toast";
import useAuth from "../Hooks/useAuth.js";
import { useState } from "react";
import { Oval } from "react-loader-spinner";
import useAxiosSecure from "../Hooks/useAxiosSecure.jsx";



const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const imageUploadApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`



export default function SignUp() {
  const { register, handleSubmit, formState: {errors}} = useForm();
  const axiosPublic = useAxiosPublic()
  const axiosSecure = useAxiosSecure()
  const [ loading , setLoading ] = useState(false)
 

 
    const { createUser , updateUserProfile } = useAuth()
    const navigate = useNavigate();


    const onSubmit = async (data) => {
      setLoading(true)

      const imageData = { image: data.photo[0] };

      const res = await axiosPublic.post(imageUploadApi, imageData, {
        headers: {
          'content-type' : 'multipart/form-data'
        }
      })
      const imageURL =  res.data.data.display_url;


      createUser(data.email, data.password)
      .then(result => {
         updateUserProfile(data.name, imageURL)
          
          const userInfo = {
            name: data.name,
            email: result.user.email,
            phone: data.phone,
            image: imageURL,
            role: data.role
          }
          // now save the user in database 
         axiosPublic.post('/users', userInfo)
         .then(res => {
          console.log(res)
          if(res.data._id){
            axiosSecure.post('/jwt', { email: userInfo.email })
            .then(res => {
              if(res.data.success){
             setLoading(false)
            toast.success('Successfully Account Created!')
            navigate('/');
              }
            })
          }
         })
      })
      .catch(error =>  {
          console.log(error)
          toast.error('Something went wrong!')
      })
     
    
    }



  return (
    <div className="hero h-[700px] md:h-[1000px] px-4 bg-[url('/15151445_5559852.jpg')]">

      <Helmet>
        <title> Rapid Parcel / Sign-up </title>
      </Helmet>
    <div className="hero-content flex-col w-full gap-0">

    <div className="text-center lg:text-left pt-5 rounded-l-lg">
        <h1 className="text-[27px] lg:text-[32px] text-white/90 font-bold text-center mb-4 font-play"> Create New Account !</h1>
      </div>

      <div className="rounded flex-shrink-0 w-full max-w-2xl  bg-black/40">
        <div className= " p-6 lg:p-10">


        <form onSubmit={handleSubmit(onSubmit)} className="text-white">
            
          <div className="form-control">
            <label className="label">
              <span className="">Name</span>
            </label>
            <input type="text" placeholder="Name" className="input input-bordered  bg-transparent  border-white/30" {...register('name',{required: true, minLength: 3, maxLength: 20})} />
            <span className="text-red-400 font-semibold text-sm p-1"> {errors.name?.type === 'required' && 'Name is required'} {errors.name?.type === 'minLength' && 'Name Must Have 3 Characters'} {errors.name?.type === 'maxLength' && 'Name Maximum 20 Characters'}  </span>
          </div>


          <div className="form-control">
            <label className="label">
              <span className="">Email</span>
            </label>
            <input type="email" placeholder="Email" className="input input-bordered  bg-transparent  border-white/30" {...register('email', {required: true, pattern: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })} />

            <span className="text-red-400 font-semibold text-sm p-1">{errors.email?.type === 'required' && 'Email is required'} {errors.email?.type === 'pattern' && 'Please input a valid email'}</span>
          </div>


          <div className="form-control">
            <label className="label">
              <span className="">Password</span>
            </label>
            <input type="text" placeholder="Password" className="input input-bordered  bg-transparent  border-white/30" {...register('password', {required: true, pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{6,8}$/ })} />

            <span className="text-red-400 font-semibold text-sm p-1"> {errors.password?.type === 'required' && 'Password is required'} {errors.password?.type === 'pattern' && 'Min 1 uppercase letter, 1 lowercase letter, 1 special character, 1 number, min 6 characters, max 8 characters.'} </span>

            <label className="label">
              <span className="">Phone</span>
            </label>
            <input type="number" placeholder="Phone" className="input input-bordered  bg-transparent  border-white/30" {...register('phone', {required: true })} />
            <span className="text-red-400 font-semibold text-sm p-1"> {errors.phone?.type === 'required' && 'Phone is required'} </span>

            <div className="form-control">
            <label className="label">
              <span className="">Upload Photo</span>
            </label>

            <div className="mb-3">
      <input
    className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-400 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
    type="file"
    id="formFileMultiple"
    multiple {...register('photo',{required: true})} /></div>

            
            <span className="text-red-400 font-semibold text-sm p-1"> {errors.photo?.type === 'required' && 'Photo is required'}  </span>
          </div>

          <div>
          <select defaultValue={'user'} className="select select-info w-full bg-transparent" {...register('role')}>
       <option value='user' className="bg-[#014BA0]">User</option>
          <option value='delivery-man' className="bg-[#014BA0]">Delivery Man</option>
        </select>
          </div>
           
            <div>
                <h4 className="text-sm font-semibold text-amber-400"> Already Have An Account? <Link to='/login'> <span className="text-white/80 hover:underline"> Login</span></Link> </h4>
            </div>

           
          <SocialLogin/>
          </div>
          <div className="form-control mt-6">
            <button className="bg-white/90 py-2 px-3 text-[#014BA0] rounded font-bold transition-all flex justify-center items-center hover:bg-white/80 text-sm md:text-base" type="submit"> {loading? <Oval
      height={25}
      width={25}
      color="#014BA0"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel='oval-loading'
      secondaryColor="#5A82BB)"
      strokeWidth={4}
      strokeWidthSecondary={4}
    
    /> : 'Sign Up '} 
     </button>
          </div>
        </form>


        </div>
      </div>
    </div>
  </div>
  )
}
