import { IoAddCircle } from "react-icons/io5";
import { TiDelete } from "react-icons/ti";
import { SiTodoist } from "react-icons/si";
import { MdAccessTime } from "react-icons/md";
import { FcHighPriority } from "react-icons/fc";
import { useState } from "react";
import CreateTask from "../Components/CreateTask";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";
import { useDrop } from "react-dnd";
import TodoList from "../Components/TodoList"
import { MdFileDownload } from "react-icons/md";
import OngoingList from "../Components/OngoingList";
import CompletedList from "../Components/CompletedList";
import useInvalidate from "../../Utils/useInvalidate";



const Tasks = () => {

    const [ open, setOpen ] = useState(false)
    const axiosPublic = useAxiosPublic()
    const { currentUser } = useAuth()
    const refetchData = useInvalidate();

    // task fetching based on the todo status 

    const { data: todoTasks =[], refetch: todoRefetch } = useQuery({
        queryKey: ['todoTasks'],
        queryFn: async () => {
          const data = await axiosPublic.get(`/get-tasks/${currentUser.email}/todo`);
          return data.data;
        }
      })

    const { data: ongoingTasks =[] } = useQuery({
        queryKey: ['ongoingTasks'],
        queryFn: async () => {
          const data = await axiosPublic.get(`/get-tasks/${currentUser.email}/ongoing`);
          return data.data;
        }
      })

    const { data: completedTasks =[] } = useQuery({
        queryKey: ['completedTasks'],
        queryFn: async () => {
          const data = await axiosPublic.get(`/get-tasks/${currentUser.email}/completed`);
          return data.data;
        }
      })


      const [ { isOver: todoOver }, todoDrop ] = useDrop(()=> ({
        accept : "task",
        drop: () => ({ name: "todo"}),
        collect : (monitor) =>  ({
            isOver : !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
        })
      }), [],)


      const [ { isOver:onGoingOver }, ongoingDrop ] = useDrop(()=> ({
        accept : "task",
        drop: () => ({ name: "ongoing"}),
        collect : (monitor) =>  ({
            isOver : !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
        })
      }), [],)

     
      const [ { isOver:completeOver }, completeDrop ] = useDrop(()=> ({
        accept : "task",
        drop: () => ({ name: "completed"}),
        collect : (monitor) =>  ({
            isOver : !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
        })
      }), [],)

     



      const handleDelete = (id) => {
        axiosPublic.delete(`/delete-task/${id}`)

         .then(res => {
          if(res.data.deletedCount){
            refetchData()
          }
         })
      }


    return (
        <section className="w-full">

            <CreateTask open={open} setOpen={setOpen} refetch={todoRefetch} />

              <h1 className=" text-3xl lg:text-5xl font-racing text-[#00719C] text-center mb-16"> Your Tasks</h1>

                <section className="grid grid-cols-1 xl:grid-cols-3 gap-7 ">
                <div   ref={todoDrop} className={`${todoOver && 'opacity-50 relative'}`}>
                <h1 className=" text-2xl lg:text-2xl font-racing bg-[#00719C] text-white/90 text-center flex items-center justify-between gap-4 py-3 px-16"> Todo List <span onClick={()=> setOpen(true)} className="cursor-pointer"> <IoAddCircle size={28} /></span> </h1>
                {todoOver && <div className="flex items-center justify-center">
                  <span className="text-5xl text-[#00719C] my-2"> <MdFileDownload/></span></div>}

                {/* todo task section  */}
                {todoTasks?.map(task => <TodoList key={task._id} task={task} handleDelete={handleDelete} /> )}
                </div>


                {/* ongoing task section  */}
                <div ref={ongoingDrop} className={`${onGoingOver && 'opacity-50 relative'}`}>
                <h1 className=" text-2xl lg:text-2xl font-racing bg-[#FF7400] text-white/90 text-center flex items-center justify-between gap-4 py-3 px-16"> Ongoing  </h1>
                {onGoingOver && <div className="flex items-center justify-center">
                  <span className="text-5xl text-[#00719C] my-2"> <MdFileDownload/></span></div>}

                {ongoingTasks?.map(task => <OngoingList key={task._id} task={task} handleDelete={handleDelete} /> )}
                </div>


                {/* completed task section */}
                <div ref={completeDrop} className={`${completeOver && 'opacity-50 relative'}`}>
                <h1 className=" text-2xl lg:text-2xl font-racing bg-[#6FC915] text-white/90 text-center flex items-center justify-between gap-4 py-3 px-16"> Completed  </h1>
                {completeOver && <div className="flex items-center justify-center">
                  <span className="text-5xl text-[#00719C] my-2"> <MdFileDownload/></span></div>}

                {completedTasks?.map(task => <CompletedList key={task._id} task={task} handleDelete={handleDelete} /> )}
                </div>

                </section>
              
        </section>
    );
};

export default Tasks;