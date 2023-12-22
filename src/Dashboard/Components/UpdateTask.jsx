
import toast from "react-hot-toast";
import useAxiosPublic from '../../Hooks/useAxiosPublic'
import { useQuery } from "@tanstack/react-query";
import useInvalidate from "../../Utils/useInvalidate";
import { enqueueSnackbar } from "notistack";




export default function UpdateTask({ open, setOpen, taskId}) {
    
    const axiosPublic = useAxiosPublic();
    const refetchData = useInvalidate();


    
    const { data: singleTask =[]} = useQuery({
        queryKey: ['singleTask'],
        queryFn: async () => {
          const data = await axiosPublic.get(`/get-single-task/${taskId}`);
          return data.data;
        }
      })


    const handleSubmit = async (e) => {
        e.preventDefault()
          const form = e.target;

        const task = {
          title: form.title.value,
          priority: form.priority.value,
          description: form.description.value,
      }

    axiosPublic.patch(`/update-task/${taskId}`, task)
          .then(res => {
           
            if(res.data.matchedCount || res.data.modifiedCount){
              setOpen(false);
              refetchData()
              enqueueSnackbar('Task Updated! 🍅')
            }
          }).catch(error => {
            toast.error('Something Went Wrong, Try Again', {duration: 3000})
          }) 
 }
   
  return (
  
    <section className="flex justify-end items-center gap-1 font-play">
      {/* custom modal  */}
       {open && <section className="w-screen h-screen fixed top-0 left-0 right-0 bottom-0 z-50  bg-black/20 flex justify-center items-center">
       
       <form className="w-[400px] md:w-[500px] p-7 bg-[#00719C]" onSubmit={handleSubmit}>
       <h2 className="text-center my-4 text-3xl text-gray-200 font-prompt"> Update Task Info!</h2>
        

<div className="relative z-0 w-full mb-5 group">
    <input type="text"   className="block py-2.5 px-0 w-full text-lg text-gray-300 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 peer"  placeholder=" " name='title' defaultValue={singleTask.title} />
    <label  className="peer-focus:font-medium absolute text-lg text-gray-200 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"  > Task Title </label>
</div>

<div className="flex flex-col ">
    <label className="text-gray-200"> Task Description  </label>
    <textarea name="description" className="outline-none border rounded my-2" defaultValue={singleTask.description}  />
</div>


<div className="relative z-0 w-full mb-5 group">
<label className="text-gray-200"> Select Task Priority </label>
<select className="select select-info w-full max-w-xs rounded-sm" name="priority" defaultValue={singleTask.priority} >
  <option value='low'> Low</option>
  <option value='medium'> Medium</option>
  <option value='high'> High</option>
</select>
</div>




<button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 block md:inline"> Update </button>
<button onClick={() => setOpen(!open)} className="text-white bg-gray-700 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm mt-2 md:ml-3  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> Close </button>
</form>
       
       </section>
}
    </section>
  )
}
