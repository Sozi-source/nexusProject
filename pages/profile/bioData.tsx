import React from "react";
import { FiMail, FiUser, FiKey } from "react-icons/fi";
import { useAuth } from "@/firebase/auth";

const BioData: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="w-full max-w-md mx-auto p-6 rounded-lg shadow-md bg-white mt-[10%] space-y-4">
      {/* Greeting */}
      <h2 className="text-2xl font-bold text-gray-800 text-center sm:text-left">
        Hello, {user?.displayName || "Valued Customer"}
      </h2>

      {/* User Info Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-gray-700">
          <FiMail className="text-orange-500 flex-shrink-0" />
          <span className="break-all">
            <span className="font-semibold text-sm">Email:</span>{" "}
            {user?.email || "Not Provided"}
          </span>
        </div>

        <div className="flex items-center gap-3 text-gray-700">
          <FiKey className="text-orange-500 flex-shrink-0" />
          <span>
            <span className="font-semibold text-sm">User ID:</span>{" "}
            {user?.uid?.slice(0, 8)}...
          </span>
        </div>

        <div className="flex items-center gap-3 text-gray-700">
          <FiUser className="text-orange-500 flex-shrink-0" />
          <span>
            <span className="font-semibold text-sm">Name:</span>{" "}
            {user?.displayName || "Guest"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BioData;
