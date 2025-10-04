// import { useState } from "react";
// import { useRouter } from "next/router";
// import Link from "next/link";
// import { useCart } from "@/context/CartContext";
// import { useAuth } from "@/firebase/auth";
// import { ShoppingCart, Menu, X } from "lucide-react";
// import UserDropdown from "./userDropDown";

// const Header: React.FC = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const { cart } = useCart();
//   const { user, signOut } = useAuth();
//   const router = useRouter();

//   return (
//     <header className="w-full bg-white shadow-md fixed top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center py-4">
//           {/* Logo */}
//           <div
//             className="text-2xl font-bold text-yellow-600 cursor-pointer"
//             onClick={() => router.push("/")}
//           >
//             eDUKA
//           </div>

//           {/* Desktop Search & Nav */}
//           <div className="hidden md:flex flex-1 items-center mx-6">
//             {/* Search */}
//             <form className="flex flex-1 max-w-md gap-2"
//               onSubmit={(e)=>{
//               e.preventDefault();
//               if(searchTerm.trim()){
//                 router.push(`/products?search=${encodeURIComponent(searchTerm)}`)
//               }
//             }}>
//               <input
//                 type="text"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 placeholder="Search products"
//                 className="w-full rounded-l-lg border border-gray-300 px-4 py-2 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
//               />
//               <button
//                 type="submit"
//                 className="bg-yellow-500 text-white px-4 py-2 rounded-r-lg hover:bg-yellow-600 transition"
//               >
//                 Search
//               </button>
//             </form>

//             {/* Navigation */}
//             <nav className="ml-5">
//               <ul className="flex space-x-3 text-gray-700 font-medium">
//                 <li className="hover:text-orange-400 text-sm">
//                   <Link href="/">Home</Link>
//                 </li>
//                 <li className="hover:text-orange-400 text-sm">
//                   <Link href="/profile">Account</Link>
//                 </li>
//                 <li className="hover:text-orange-400 text-sm">
//                   <Link href="/contactUs">Contact Us</Link>
//                 </li>
//               </ul>
//             </nav>
//           </div>

//           {/* Right side */}
//           <div className="flex items-center space-x-8">
//             {/* Cart */}
//              {/* user */}
          
//           <div>
//             {user? (
//               <p className="text-orange-500 text-sm font-bold">Hi, {user.displayName}</p>
//             ):(
//               <p className="text-orange-500 text-sm font-bold">Hi, Guest</p>
//             )}
//           </div>
            
//             <div
//               className="relative cursor-pointer"
//               onClick={() => router.push("/cart")}
//             >
//               <ShoppingCart className="w-8 h-8 text-yellow-600" />
//               {cart.length > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs rounded-full px-2">
//                   {cart.length}
//                 </span>
//               )}
//             </div>

//             {/* Auth */}
//             {user ? (
//               <div className="relative hidden md:block">
//                 <UserDropdown user={user} signOut={signOut} />
//               </div>
//             ) : (
//               <Link
//                 href="/authPage"
//                 className="hidden md:inline-block bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
//               >
//                 Login
//               </Link>
//             )}

//             {/* Mobile menu button */}
//             <button
//               className="md:hidden p-2 rounded-md hover:bg-gray-100"
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             >
//               {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile menu */}
//       {mobileMenuOpen && (
//         <div className="md:hidden bg-white shadow-md border-t border-gray-200">
//           <div className="px-4 py-4 space-y-4">
//             <form className="flex gap-2"
//             onSubmit={(e)=>{
//               e.preventDefault();
//               if(searchTerm.trim()){
//                 router.push(`/products?search=${encodeURIComponent(searchTerm)}`)
//               }
//             }}>
//               <input
//                 type="text"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 placeholder="Search products"
//                 className="flex-1 rounded-l-lg border border-gray-300 px-4 py-2 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
//               />
//               <button className="bg-yellow-500 text-white px-4 py-2 rounded-r-lg hover:bg-yellow-600 transition">
//                 Search
//               </button>
//             </form>

//             <nav>
//               <ul className="flex flex-col space-y-3 text-gray-700 font-medium">
//                 <li>
//                   <Link href="/">Home</Link>
//                 </li>
//                 <li>
//                   <Link href="/profile">Profile</Link>
//                 </li>
//                 {user ? (
//                   <li>
//                     <UserDropdown user={user} signOut={signOut} />
//                   </li>
//                 ) : (
//                   <li>
//                     <Link
//                       href="/authPage"
//                       className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition block text-center"
//                     >
//                       Login
//                     </Link>
//                   </li>
//                 )}
//               </ul>
//             </nav>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// };

// export default Header;

import { PhoneCallIcon } from "lucide-react";
import { useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { MdEmail } from "react-icons/md";

const ContactUs: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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

    setName("");
    setEmail("");
    setMessage("");
    alert("Your message has been sent");
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* Contact Information */}
        <div className="flex flex-col items-start justify-start space-y-4 px-4 py-6 shadow rounded-md hover:bg-gray-100 bg-white">
          <h3 className="text-lg font-bold text-yellow-500 font-serif">Contact Us</h3>
          <p className="flex items-center gap-2 hover:text-blue-600">
            <MdEmail className="h-6 w-6 text-gray-700" /> shop@eduka.co.ke
          </p>
          <p className="flex items-center gap-2 hover:text-blue-600">
            <PhoneCallIcon className="h-6 w-6 text-gray-700" /> +254711390861
          </p>
          <p className="flex items-center gap-2">
            <CiLocationOn className="h-6 w-6 text-gray-600" /> Nairobi, Kenya
          </p>
        </div>

        {/* Message Form */}
        <div className="flex flex-col shadow rounded-md bg-white p-6">
          <form onSubmit={handleFormSubmit} className="flex flex-col space-y-4">
            <h3 className="text-lg font-bold text-yellow-500 font-serif">Message Us</h3>

            <div className="flex flex-col">
              <label htmlFor="name" className="mt-2">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="message">Message</label>
              <textarea
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your message"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Map */}
        <div className="lg:col-span-3 px-4 py-6 shadow rounded-md bg-white">
          <h3 className="text-lg sm:text-xl font-semibold text-yellow-500 mb-4 text-center">
            Find Us On The Map
          </h3>
          <div className="w-full h-64 sm:h-80 md:h-96 lg:h-[400px] xl:h-[500px] rounded-md overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d127649.13044240138!2d37.00207473267293!3d-1.1351346871630512!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2ske!4v1759580590147!5m2!1sen!2ske"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContactUs;
