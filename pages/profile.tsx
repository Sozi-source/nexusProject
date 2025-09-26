import React, { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";


const Profile: React.FC = () => {
    const[username, setUsername]= useState<string>("");

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (user)=>{
            if(user){
                setUsername(user.displayName ||"user")
            }else{
                setUsername("");
            }

        })

        return ()=> unsubscribe()
    }, [])




    return (
        <div className="mt-20">
            <h1>Hello, {username} </h1>
            <p>Welcome to your profile!</p>
        </div>
    );
};

export default Profile;