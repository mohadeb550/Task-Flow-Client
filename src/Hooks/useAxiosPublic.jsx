import axios from "axios";

 export const axiosPublic = axios.create({
    baseURL: import.meta.env.VITE_SERVER
})

export default function useAxiosPublic() {
    return axiosPublic;
 
}
