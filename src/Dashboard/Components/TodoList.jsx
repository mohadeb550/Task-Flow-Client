
import { TiDelete } from "react-icons/ti";
import { SiTodoist } from "react-icons/si";
import { MdAccessTime } from "react-icons/md";
import { FcHighPriority } from "react-icons/fc";
import { useDrag } from "react-dnd";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useInvalidate from "../../Utils/useInvalidate";




const TodoList = ({ handleDelete, task }) => {

    const axiosPublic = useAxiosPublic()
    const refetchData = useInvalidate();

    
    const [ { isDragging }, drag ] = useDrag(() => ({
        type: 'task',
        item: task,
        end: (item, monitor ) => {
            const dropResult = monitor.getDropResult();
            if(item && dropResult){
              
        axiosPublic.patch(`/update-task/${item._id}`, { status : dropResult.name})
         .then(res => {
        if( res.data.modifiedCount){
           refetchData();
          }})
        }
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
      }), [], )
    


    return (
        <div  ref={drag}  className={`p-2 bg-slate-100 my-4 relative ${isDragging && 'bg-gray-400'}`}>
            
                    <span onClick={() => handleDelete(task._id)} className=" text-red-600 absolute top-0 right-0"> <TiDelete size={26} /> </span>
                <h1 className="text-base lg:text-xl  text-[#00719C] flex items-center gap-3 pt-3 font-prompt "> <SiTodoist/>  {task.title}  </h1>

               
             <div className="flex items-center gap-3 justify-between">
             <span className="flex items-center gap-2 my-2 text-gray-400"> <MdAccessTime/> Deadline : {task.deadline} </span>
             <span className="flex items-center gap-2 my-2"> <FcHighPriority/> <span className="text-gray-500">  Priority : <span className="capitalize">{task.priority}</span> </span> </span>
             </div>

                <p className=" text-gray-500  flex items-center justify-between gap-4 font-prompt pt-3"> {task?.description}  </p>
              
                </div>
    );
};

export default TodoList;