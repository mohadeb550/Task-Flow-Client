import {  GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react"
import auth from "../config/firebase.config";




export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();


export default function AuthProvider({children}) {

 
    const [ authLoading , setAuthLoading ] = useState(true);
    const [ currentUser ,setCurrentUser ] = useState(null);


     // sign up with email & password 
     const createUser = (email, password) => {
      return createUserWithEmailAndPassword(auth, email, password);
    }

    // login with google
    const loginWithGoogle = () => {
      return signInWithPopup(auth, googleProvider);
    }


    // login with email & password
    const loginUser = (email, password ) => {
      return signInWithEmailAndPassword(auth, email, password);
    }

    // update user profile 
    const updateUserProfile = (name, image) => {
      return updateProfile(auth.currentUser, {displayName: name, photoURL: image})
    }


    // logout user 
    const logOut = () => {
     return signOut(auth);
    }

    // firebase observer
    useEffect(()=>{
     
      const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
      
        setCurrentUser(currentUser);
        setAuthLoading(false);
      })
      return ()=>{
        unsubscribe();
      }
    },[])



    const authInfo = { createUser , loginWithGoogle ,loginUser, logOut, updateUserProfile ,currentUser  }

    if(authLoading ){return }


  return (
    <AuthContext.Provider value={authInfo}>
    {children}
    </AuthContext.Provider>
  )
}
