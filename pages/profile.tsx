import React, { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";
import BioData from "@/components/profile/bioData";
import OrderList from "@/components/profile/OrderList";
import AccountSettings from "@/components/profile/accountSettings";


const Profile: React.FC = () => {
    const[user, setUser]= useState<User|null>(null);

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser)=>{
            if(firebaseUser){
                setUser(firebaseUser)
            }else{
                setUser(null);
            }

        })

        return ()=> unsubscribe()
    }, [])

    if(!user) return <p className="mt-20 text-center">Loading user data...</p>




    return (
        <div className="mt-20 space-y-6">
            <BioData user={user}/>
            <OrderList user={user} />
            <AccountSettings user={user}/>
        </div>
    );
};

export default Profile;