import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth"
import useAxiosSecure from "../../Hooks/useAxiosSecure";


export default function MyProfile() {
    const axiosSecure = useAxiosSecure();
    const { currentUser } = useAuth();


    const { data: userInfo = {}} = useQuery({
        queryKey: ['single-user'],
        queryFn : async () => {
    
          const res = await axiosSecure.get(`/users/${currentUser.email}`);
          return res.data;
        }
      })


    
  return (
    <div className="p-4 xl:p-16 max-w-7xl mx-auto">



    <div className="p-8 bg-white shadow mt-24">
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="grid grid-cols-3 text-center order-last md:order-first mt-6 md:mt-0">
          <div>
            <p className="font-bold text-gray-700 text-xl">22</p>
            <p className="text-gray-400">Friends</p>
          </div>
          <div>
               <p className="font-bold text-gray-700 text-xl">10</p>
            <p className="text-gray-400">Photos</p>
          </div>
              <div>
               <p className="font-bold text-gray-700 text-xl">89</p>
            <p className="text-gray-400">Comments</p>
          </div>
        </div>
        <div className="relative">
          <div className=" w-32 h-32 xl:w-48 xl:h-48 border-2 p-1   mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                <img src={userInfo.image} className="w-full h-full rounded-full object-cover" />
          </div>
        </div>
    
        
      </div>
    
      <div className="mt-20 text-center border-b pb-12">
        <h1 className="text-4xl font-medium text-gray-700"> {userInfo.name} </h1>
        <p className="font-light text-gray-600 mt-3"> {userInfo.address? userInfo.address : 'Your Address Here'}  </p>
    
        <p className="mt-2 text-gray-500"> User Id : {userInfo._id}</p>
        <p className="mt-8 text-gray-500"> Email - {userInfo.email}</p>
      
      </div>
    
      <div className="mt-12 flex flex-col justify-center">
        <p className="text-gray-600 text-center font-light lg:px-16">An artist of considerable range, Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and records all of his own music, giving it a warm, intimate feel with a solid groove structure. An artist of considerable range.</p>
        <button
      className="text-indigo-500 py-2 px-4  font-medium mt-4"
    >
      Show more
    </button>
      </div>
    
    </div>
    </div>
  )
}
