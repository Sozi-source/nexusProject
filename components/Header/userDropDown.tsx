// import React, { useState, useRef, useEffect } from "react";
// import BioData from "../profile/bioData";
// import AccountSettings from "../profile/accountSettings";
// import { User } from "firebase/auth";
// import { FiChevronDown, FiUser } from "react-icons/fi";

// interface UserDropdownProps {
//   user: User;
//   signOut: () => void;
// }

// const UserDropdown: React.FC<UserDropdownProps> = ({ user, signOut }) => {
//   const [open, setOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <button
//         onClick={() => setOpen(!open)}
//         className="flex items-center gap-2 bg-white border px-3 py-2 rounded-md shadow hover:bg-gray-50"
//       >
//         <FiUser className="w-5 h-5 text-gray-700" />
//         <span>{user.displayName || "User"}</span>
//         <FiChevronDown className="w-4 h-4 text-gray-500" />
//       </button>

//       {open && (
//         <div className="absolute right-0 mt-2 w-80 bg-white border rounded-md shadow-lg z-50">
//           <div className="p-4 flex flex-col gap-4 max-h-96 overflow-y-auto">
//             <BioData user={user} />
//             <AccountSettings user={user} />
//             <button
//               onClick={signOut}
//               className="mt-2 w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-md"
//             >
//               Sign Out
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserDropdown;

import React, { useState, useRef, useEffect } from "react";
import { User } from "firebase/auth";
import { FiChevronDown, FiUser, FiSettings, FiInfo } from "react-icons/fi";
import { useRouter } from "next/router";
import AccountSettings from "../../pages/profile/accountSettings";

interface UserDropdownProps {
  user: User;
  signOut: () => void;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ user, signOut }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Icon button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-white border px-3 py-2 rounded-md shadow hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
      >
        <FiUser className="w-5 h-5 text-gray-700" />
        <FiChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${open ? "rotate-180" : "rotate-0"}`} />
      </button>

      {/* Dropdown Icons */}
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-xl z-50 py-2 flex flex-col gap-2">
          <button
            onClick={() => {
              router.push("/profile/bioData");
              setOpen(false);
            }}
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200 transition"
          >
            <FiInfo className="w-5 h-5 text-gray-700" />
            <span className="text-sm text-gray-700">Bio</span>
          </button>

          <button
            onClick={() => {
              router.push("/profile/accountSettings"); 
              setOpen(false);
            }}
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition"
          >
            <FiSettings className="w-5 h-5 text-gray-700" />
            <span className="text-sm text-gray-700">Settings</span>
          </button>

          <button
            onClick={signOut}
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition text-red-500"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
