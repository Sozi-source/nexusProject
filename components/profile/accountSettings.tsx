import React, { useState } from "react";
import { User, updateProfile, updateEmail, updatePassword } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";

interface AccountSettingsProps {
  user: User;
}

const AccountSettings: React.FC<AccountSettingsProps> = ({ user }) => {
  const [displayName, setDisplayName] = useState(user.displayName || "");
  const [email, setEmail] = useState(user.email || "");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleUpdateProfile = async () => {
    try {
      if (displayName !== user.displayName) {
        await updateProfile(user, { displayName });
      }
      if (email !== user.email) {
        await updateEmail(user, email);
      }
      if (password) {
        await updatePassword(user, password);
      }
      setMessage("Account updated successfully!");
    } catch (error: any) {
      setMessage(error.message);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm space-y-4">
      <h2 className="text-xl font-semibold">Account Settings</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">Display Name</label>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="mt-1 w-full rounded-lg border px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded-lg border px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">New Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Leave blank to keep current password"
          className="mt-1 w-full rounded-lg border px-3 py-2"
        />
      </div>

      <button
        onClick={handleUpdateProfile}
        className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
      >
        Update Account
      </button>

      {message && <p className="text-sm text-green-600">{message}</p>}
    </div>
  );
};

export default AccountSettings;
