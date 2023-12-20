
import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";




export default function PrivateRoute({children}) {

  const { currentUser } = useContext(AuthContext);
  const location = useLocation();
 
  if(!currentUser){
    return <Navigate state={ { from: location}} to='/login'/>;
  }

  return (
    <>
    {children}
    </>
  )
}


