import useInvalidate from "../Utils/useInvalidate";
import useAxiosPublic from "./useAxiosPublic";



const useUpdateTask = () => {

    const refetchData = useInvalidate();
    const axiosPublic = useAxiosPublic()

   return (id, status) => {
    
    axiosPublic.patch(`/update-task/${id}`, { status})
    .then(res => {
   if( res.data.modifiedCount){
      refetchData();
     }})
   }
};

export default useUpdateTask;

