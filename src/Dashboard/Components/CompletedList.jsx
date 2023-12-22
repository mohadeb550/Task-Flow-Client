
import { TiDelete } from "react-icons/ti";
import { SiTodoist } from "react-icons/si";
import { MdAccessTime } from "react-icons/md";
import { FcHighPriority } from "react-icons/fc";
import { useDrag } from "react-dnd";
import useUpdateTask from "../../Hooks/useUpdateTask";




const CompletedList = ({ handleDelete, task }) => {

    const updateTask = useUpdateTask();

    
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
      }), [],)


    return (
        <div ref={drag}  className={`p-2  my-4 relative rounded ${isDragging? 'bg-gray-700': 'bg-[#6FC915]/10'}`}>
            
                    <span onClick={() => handleDelete(task._id)} className=" text-red-600 absolute top-0 right-0"> <TiDelete size={26} /> </span>
                <h1 className=" lg:text-xl  text-[#228C22] flex items-center gap-3 pt-4 font-prompt flex-wrap "> <SiTodoist size={25}/>  {task.title}  </h1>

               
             <div className="flex items-center gap-3 justify-between">
             <span className="flex items-center gap-2 my-2 text-gray-400"> <MdAccessTime/> Deadline : {task.deadline} </span>
             <span className="flex items-center gap-2 my-2"> <FcHighPriority/> <span className="text-gray-500">  Priority : <span className="capitalize">{task.priority}</span> </span> </span>
             </div>

                <p className=" text-gray-500  flex items-center justify-between gap-4 font-prompt pt-3"> {task?.description}  </p>
              
                </div>
    );
};

export default CompletedList;