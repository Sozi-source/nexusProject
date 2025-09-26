import { auth } from "./firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, User, onAuthStateChanged, UserCredential, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import {signOut as firebaseSignOut} from "firebase/auth";

export const useAuth =()=>{
    const[user, setUser] =useState<User|null>(null)
    const[error, setError]= useState<string|null>(null)
    const[loading, setLoading] =useState(true)


useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser)=>{
        setUser(firebaseUser);
        setLoading(false)
    })
    return ()=>unsubscribe();
},[])


const signUp =async(email:string, password:string, name:string)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        // display user
        if(auth.currentUser){
            await updateProfile(auth.currentUser, {
                displayName: name
            })
        }

        return res.user;
    } catch (error:any) {
        setError(error.message)
        throw error;
    }
}

const signIn =async(email:string, password:string)=>{
    try {
        const res = await signInWithEmailAndPassword(auth, email, password)
        return res.user;
    } catch (error:any) {
        setError(error.message)
        throw error;
}
}


const signOut=async()=>{
    try {
        await firebaseSignOut(auth);
        setUser(null)
    } catch (error:any) {
        setError(error.message)
        
    }
}

return{signIn, signUp, signOut, error, user, loading}
}

