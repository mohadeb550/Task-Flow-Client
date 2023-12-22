
import { TiDelete } from "react-icons/ti";
import { SiTodoist } from "react-icons/si";
import { MdAccessTime } from "react-icons/md";
import { FcHighPriority } from "react-icons/fc";
import { useDrag } from "react-dnd";
import { AiFillEdit } from "react-icons/ai";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import useUpdateTask from "../../Hooks/useUpdateTask";
import { useState } from "react";
import UpdateTask from "./UpdateTask";



const TodoList = ({ handleDelete, task }) => {

  const updateTask = useUpdateTask();
  const [ open, setOpen ] = useState(false)
  const [ taskId, setTaskId ] = useState('');
    
    
    const [ { isDragging }, drag ] = useDrag(() => ({
        type: 'task',
        item: task,
        end: (item, monitor ) => {
            const dropResult = monitor.getDropResult();
            if(item && dropResult){
              updateTask(item._id, dropResult.name)
        }
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
      }), [], )
    


    return (
        <div  ref={drag}  className={`p-2 bg-slate-100 my-4 relative rounded ${isDragging && 'bg-gray-700'}`}>
            
                    <div className="absolute top-0 right-0 flex items-center gap-3 p-4">
                   
                    <span onClick={() => updateTask(task._id, 'ongoing')} className=" text-[#00719C] hover:bg-slate-200 flex items-center gap-1 border border-[#00719C] p-1 rounded-full text-xs"> <IoShieldCheckmarkOutline size={17}  /> Mark As Ongoing </span>
                    <span onClick={() => updateTask(task._id, 'completed')} className=" text-[#00719C] hover:bg-slate-200 flex items-center gap-1 border border-[#00719C] p-1 rounded-full text-xs"> <IoCheckmarkCircleOutline size={17} /> Mark As Completed </span>

                   {open &&  <UpdateTask open={open} setOpen={setOpen} taskId={taskId}  />}
                    <span onClick={() => { setTaskId(task._id); setOpen(true)}} className=" text-[#00719C] "> <AiFillEdit size={24} /> </span>
                    <span onClick={() => handleDelete(task._id)} className=" text-red-600 "> <TiDelete size={26} /> </span>
                    </div>
                <h1 className="text-base lg:text-xl  text-[#00719C] flex items-center gap-3 pt-14 font-prompt  flex-wrap"> <SiTodoist size={25}/>  {task.title}  </h1>

               
             <div className="flex items-center gap-3 justify-between">
             <span className="flex items-center gap-2 my-2 text-gray-400"> <MdAccessTime/> Deadline : {task.deadline} </span>
             <span className="flex items-center gap-2 my-2"> <FcHighPriority/> <span className="text-gray-500">  Priority : <span className="capitalize">{task.priority}</span> </span> </span>
             </div>

                <p className=" text-gray-500  flex items-center justify-between gap-4 font-prompt pt-3"> {task?.description}  </p>
              
                </div>
    );
};

export default TodoList;