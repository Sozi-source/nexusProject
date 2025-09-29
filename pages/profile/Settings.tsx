import React, { useState } from "react";
import { useAuth } from "@/firebase/auth";
import { updateProfile, updatePassword, User } from "firebase/auth";

const AccountSettings: React.FC = () => {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  if (!user) {
    return (
      <p className="text-center text-red-500 text-lg py-10">
        Please sign in to update account settings.
      </p>
    );
  }

  // Typed event handlers
  const handleDisplayNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayName(e.target.value);
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleUpdateProfile = async () => {
    try {
      await updateProfile(user as User, { displayName });
      setMessage("Profile updated successfully!");
    } catch (error: unknown) {
      if (error instanceof Error) setMessage(error.message);
      else setMessage("An unexpected error occurred.");
    }
  };

  const handleUpdatePassword = async () => {
    try {
      if (newPassword.trim().length < 6) {
        setMessage("Password should be at least 6 characters long.");
        return;
      }
      await updatePassword(user as User, newPassword);
      setMessage("Password updated successfully!");
      setNewPassword("");
    } catch (error: unknown) {
      if (error instanceof Error) setMessage(error.message);
      else setMessage("An unexpected error occurred.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 rounded-lg shadow-md bg-white mt-[10%] space-y-4">
      <h2 className="text-xl font-semibold mb-4 text-orange-500">
        Account Settings
      </h2>

      {/* Show Email */}
      <p className="text-gray-700 text-sm mb-4">
        <span className="font-medium">Email:</span> {user.email}
      </p>

      {/* Display Name */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-2">
          Display Name
        </label>
        <input
          type="text"
          value={displayName}
          onChange={handleDisplayNameChange}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <button
          onClick={handleUpdateProfile}
          className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        >
          Update Profile
        </button>
      </div>

      {/* Update Password */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-2">
          New Password
        </label>
        <input
          type="password"
          value={newPassword}
          onChange={handleNewPasswordChange}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <button
          onClick={handleUpdatePassword}
          className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        >
          Update Password
        </button>
      </div>

      {/* Feedback */}
      {message && <p className="text-sm text-gray-600 mt-2">{message}</p>}
    </div>
  );
};

export default AccountSettings;
