import { useAuth } from "@/firebase/auth";
import React from "react";
import { User } from "firebase/auth";

interface profileBioProps{
    user: User;
}
const BioData: React.FC<profileBioProps> = ({user}) => {
   
    return (
        <div className="p-4 border rounded-lg shadow-sm">
            <h2 className="profileBioProps">Bio Data</h2>
            <p>Hello, {user?.displayName || "User"} </p>
            <p>Email: {user?.email} </p>
            <p>UID: {user.uid} </p>
        </div>
    );
};

export default BioData;