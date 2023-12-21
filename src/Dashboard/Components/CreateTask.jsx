import Swal from "sweetalert2";

import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from '../../Hooks/useAxiosSecure'
import { useState } from "react";
import { IoMdStarOutline } from "react-icons/io";
import { IoMdStar } from "react-icons/io";
import { QueryClient } from "@tanstack/react-query";



export default function CreateTask({ open, setOpen, refetch}) {
    
    const axiosSecure = useAxiosSecure();
    const { currentUser } = useAuth();


    const handleSubmit = async (e) => {
        e.preventDefault()
          const form = e.target;

        const task = {
          title: form.title.value,
          email:currentUser.email,
          deadline: form.deadline.value,
          priority: form.priority.value,
          description: form.description.value,
          status: 'todo'
      }

    axiosSecure.put(`/add-task`, task)
          .then(res => {
           
            if(res.data.matchedCount || res.data.modifiedCount || res.data.upsertedCount){
              refetch()
              setOpen(false);
              toast.success('New Task Added 😋😊!', {duration: 3000})
            }
          }).catch(error => {
            toast.error('Something Went Wrong, Try Again', {duration: 3000})
          }) 
 }
   
  return (
  
    <section className="flex justify-end items-center gap-1 font-play">
      {/* custom modal  */}
       {open && <section className="w-screen h-screen fixed top-0 left-0 right-0 bottom-0 z-50  bg-black/20 flex justify-center items-center">
       
       <form className="w-[400px] md:w-[500px] p-7 bg-white" onSubmit={handleSubmit}>
       <h2 className="text-center my-4 text-3xl text-gray-500 font-prompt"> Create New Task!</h2>
        

<div className="relative z-0 w-full mb-5 group">
    <input type="text"   className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"  placeholder=" " name='title' />
    <label  className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"  > Task Title </label>
</div>

<div className="flex flex-col ">
    <label> Task Description  </label>
    <textarea name="description" className="outline-none border rounded my-2" />
</div>


<div className="relative z-0 w-full mb-5 group">
<label className="text-gray-500"> Select Task Priority </label>
<select className="select select-info w-full max-w-xs rounded-sm" name="priority" >
  <option value='low'> Low</option>
  <option value='medium'> Medium</option>
  <option value='high'> High</option>
</select>
</div>

<div className="flex gap-4 justify-between my-3">
    <label className="text-gray-500"> Deadline </label>
    <input type="date" name="deadline" />
</div>
      


<button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 block md:inline"> Add </button>
<button onClick={() => setOpen(!open)} className="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm mt-2 md:ml-3  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> Close </button>
</form>
       
       </section>
}
    </section>
  )
}
