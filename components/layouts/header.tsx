import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";
import { useAuth } from "@/firebase/auth";


const Header: React.FC=()=>{
const[searchTerm, setSearchTerm]= useState("")
const {cart}=useCart()
const router= useRouter()
const {user, signOut}=useAuth();

    return(
        <header className="w-full bg-white shadow-md fixed top-0 mb-6">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
            
             {/* logo section */}
            <div className="text-2xl font-bold text-yellow-600 cursor-pointer" onClick={()=>router.push("/")}>
                <h1>SHOPLY</h1>
            </div>

            {/* Search button */}
            <div className="hidden md:flex flex-1 items-center mx-6">
             <form className="flex flex-1 max-w-md gap-2">
                <input type="text"
                value={searchTerm}
                onChange={(e)=>setSearchTerm(e.target.value)}
                placeholder="Search products" 
                className="w-full rounded-l-lg border border-gray-300 px-4 py-2 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 focus:outline-none"/>

                <button 
                type="submit" 
                className="bg-yellow-500 text-white px-4 py-2 rounded-r-lg hover:bg-yellow-600 transition">Search
                </button>
            </form>

            {/* Navigation links */}
            <nav className="ml-5">
                <ul className="flex space-x-6 text-gray-700 font-medium">
                    <li className="hover:text-orange-400"><Link href="/">Home</Link> </li>
                    <li className="hover:text-orange-400"><Link href="profile">Profile</Link></li>
                </ul>
            </nav>
            </div>

            {/* right side (Cart + Auth) */}
            <div className="flex space-x-4 items-center">

            {user? (
                <>
            <span className="hidden md:inline-block text-gray-700 font-medium hover:text-orange-500">
                Hi, {user.displayName || "User"} 
            </span>

            <button 
            onClick={signOut}
            className="text-gray-700 px-4 py-2 rounded-lg hover:text-orange-400 transition hidden md:inline-block"
            >Sign Out
            </button>
            </>
            ):(
            
            <Link href="/authPage" 
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition hidden md:inline-block">
            Login
            </Link>
            )
        }
          <div className="relative" onClick={()=>router.push("/cart")}>
            <ShoppingCart className="w-8 h-8 text-yellow-600"/>
            <span className="absolute -top-2 bg-yellow-500 text-white text-xs rounded-full px-2 ml-2">
            {cart.length}
            </span>
        </div>       
            </div>
            </div>
           </div>

        </header>
    )
}
export default Header;