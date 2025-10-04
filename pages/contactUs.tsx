import {PhoneCallIcon } from "lucide-react";
import { useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { MdEmail } from "react-icons/md";

const ContactUs:React.FC=()=>{
    const[name, setName]= useState("");
    const[email, setEmail]=useState("")
    const[message, setMessage]=useState("")

    const handleFormSubmit =(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name.trim() || !email.trim() || !message.trim()) {
            alert("Please fill in all fields.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        // reset form
        setName("");
        setEmail("");
        setMessage("");

        alert("Your message has been sent")

       
    };

    return(
        <div className="grid grid-cols-3 mt-[10%] bg-white">
        <div className="flex flex-col items-start justify-start space-y-4 px-4 shadow rounded-md m-5 p-5 hover:bg-gray-100">
            <h3 className="text-lg font-bold text-yellow-500 font-serif">Contact us</h3>
            <p className="flex items-center space-x-3 hover:text-blue-600 gap-3 "><MdEmail className="h-8 w-6"/> <span>shop@eduka.co.ke</span></p>
            <p className="flex items-center space-x-3 hover:text-blue-600 gap-3"><PhoneCallIcon className="h-8 w-6"/><span> +254711390861</span></p>
            <p className="flex items-center space-x-3 gap-3"><CiLocationOn className="h-6 w-6 text-gray-600"/><span>Nairobi, Kenya</span> </p>
        </div>

        <div className="flex flex-col shadow rounded-md mb-[10%]">
            <form onSubmit={handleFormSubmit} className="border border-gray-100 rounded-md p-5">
                <h3 className="text-lg font-bold text-yellow-500 font-serif">Message Us</h3>
                <label htmlFor="name" className="mt-5">Name</label>
                <input 
                type="text" 
                value={name}
                onChange={(e)=>setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>

                <label htmlFor="email">Email</label>
                <input type="email"
                value={email} 
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>

                <label htmlFor="message">Message</label>
                <textarea name="message"
                value={message}
                onChange={(e)=>setMessage(e.target.value)}
                placeholder="Your message"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                </textarea>
                <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors">Submit</button>
            </form>
        </div>
        </div>
    )
}
export default ContactUs;