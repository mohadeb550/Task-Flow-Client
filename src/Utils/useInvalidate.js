import { useQueryClient } from "@tanstack/react-query";


const useInvalidate = () => {

    const queryClient = useQueryClient();
    
    return () => {
        queryClient.invalidateQueries(['todoTasks','ongoingTasks', 'completedTasks' ]);
    }
};

export default useInvalidate;

