import { IoAddCircle } from "react-icons/io5";
import { TiDelete } from "react-icons/ti";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { SiTodoist } from "react-icons/si";
import { MdAccessTime } from "react-icons/md";
import { FcHighPriority } from "react-icons/fc";
import { FcLowPriority } from "react-icons/fc";
import { FcMediumPriority } from "react-icons/fc";
import { useState } from "react";
import CreateTask from "../Components/CreateTask";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";



const Tasks = () => {

    const [ open, setOpen ] = useState(false)
    const axiosPublic = useAxiosPublic()
    const { currentUser } = useAuth()

    const { data: tasks =[], refetch } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
          const data = await axiosPublic.get(`/get-tasks/${currentUser.email}`);
          return data.data;
        }
      })


      const handleDelete = (id) => {
        axiosPublic.delete(`/delete-task/${id}`)

         .then(res => {
          if(res.data.deletedCount){
            refetch()
          }
         })
      }


    return (
        <section className="w-full">

            <CreateTask open={open} setOpen={setOpen} refetch={refetch} />

              <h1 className=" text-3xl lg:text-5xl font-racing text-[#00719C] text-center mb-16"> Your Tasks</h1>

                <section className="grid grid-cols-1 xl:grid-cols-3 gap-7 ">
                <div >
                <h1 className=" text-2xl lg:text-2xl font-racing bg-[#00719C] text-white/90 text-center flex items-center justify-between gap-4 py-3 px-16"> Todo List <span onClick={()=> setOpen(true)} className="cursor-pointer"> <IoAddCircle size={28} /></span> </h1>

                {tasks?.map(task => <div key={task._id} className="p-2 bg-slate-100 my-4 relative">
                    <span onClick={() => handleDelete(task._id)} className=" text-red-600 absolute top-0 right-0"> <TiDelete size={26} /> </span>
                <h1 className="text-base lg:text-xl  text-[#00719C] flex items-center gap-3 pt-3 font-prompt "> <SiTodoist/>  {task.title}  </h1>

               
             <div className="flex items-center gap-3 justify-between">
             <span className="flex items-center gap-2 my-2 text-gray-400"> <MdAccessTime/> Deadline : {task.deadline} </span>
             <span className="flex items-center gap-2 my-2"> <FcHighPriority/> <span className="text-gray-500">  Priority : <span className="capitalize">{task.priority}</span> </span> </span>
             </div>

                <p className=" text-gray-500  flex items-center justify-between gap-4 font-prompt pt-3"> {task?.description}  </p>
              
                </div>)}
                </div>


                
                <div >
                <h1 className=" text-2xl lg:text-2xl font-racing bg-[#00719C] text-white/90 text-center flex items-center justify-between gap-4 py-3 px-16"> Ongoing Tasks </h1>
                </div>

                <div >
                <h1 className=" text-2xl lg:text-2xl font-racing bg-[#00719C] text-white/90 text-center flex items-center justify-between gap-4 py-3 px-16"> Completed Tasks </h1>
                </div>
                </section>
              
        </section>
    );
};

export default Tasks;