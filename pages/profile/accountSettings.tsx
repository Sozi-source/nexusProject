import React, { useState } from "react";
import { User, updateProfile, updateEmail, updatePassword } from "firebase/auth";
import { useAuth } from "@/firebase/auth";

const AccountSettings: React.FC = () => {
const {user}= useAuth()

  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleUpdateProfile = async () => {
    if(!user) return;
    try {
      if (displayName !== user?.displayName) await updateProfile(user, { displayName });
      if (email !== user?.email) await updateEmail(user, email);
      if (password) await updatePassword(user, password);
      setMessage("Account updated successfully!");
    } catch (error: any) {
      setMessage(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 rounded-lg shadow-md bg-white space-y-6 mt-[10%]">
      <h2 className="text-2xl font-bold text-yellow-500 mb-4">Settings</h2>

      <div className="">
        <div className="">
          <label className="block text-sm font-semibold text-gray-700">Display Name</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="mt-1 w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-yellow-300 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-yellow-300 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Leave blank to keep current password"
            className="mt-1 w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-yellow-300 focus:outline-none"
          />
        </div>
      </div>

      <button
        onClick={handleUpdateProfile}
        className="w-full bg-yellow-500 text-white py-2 rounded-lg font-semibold hover:bg-yellow-600 transition"
      >
        Update Account
      </button>

      {message && (
        <p className={`text-sm ${message.includes("successfully") ? "text-green-600" : "text-red-600"}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default AccountSettings;
