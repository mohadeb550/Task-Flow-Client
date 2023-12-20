import axios from "axios"


const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_SERVER, 
    withCredentials: true,
})

export default function useAxiosSecure() {

  return axiosSecure;
}