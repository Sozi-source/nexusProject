
import React, { useState, useRef, useEffect } from "react";
import { User } from "firebase/auth";
import { FiChevronDown, FiUser, FiSettings, FiInfo } from "react-icons/fi";
import { useRouter } from "next/router";
import { GoSignOut } from "react-icons/go";
import { Package } from "lucide-react";

interface UserDropdownProps {
  user: User;
  signOut: () => void;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ signOut }) => {
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
        className="flex items-center gap-2 bg-white border border-yellow-400 px-3 py-2 rounded-md shadow hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
      >
        <FiUser className="w-5 h-5 text-yellow-700" />
        <FiChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${open ? "rotate-180" : "rotate-0"}`} />
      </button>

      {/* Dropdown Icons */}
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-xl z-50 py-2 flex flex-col gap-2">
          <button
            onClick={() => {
              router.push("/profile");
              setOpen(false);
            }}
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200 transition"
          >
            <FiInfo className="w-5 h-5 text-gray-700" />
            <span className="text-sm text-gray-700">Profile</span>
          </button>

          <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition">
            <Package className="w-5 h-5 text-gray-700"/>
             <span className="text-sm text-gray-700">Orders</span>
          </button>

          <button
            onClick={() => {
              router.push("/profile/Settings"); 
              setOpen(false);
            }}
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition"
          >
            <FiSettings className="w-5 h-5 text-gray-700" />
            <span className="text-sm text-gray-700">Settings</span>
          </button>

          <button
            onClick={signOut}
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition text-red-500 text-sm"
          >
            <GoSignOut/> Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
