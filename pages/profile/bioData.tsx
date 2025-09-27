import React, { useEffect, useState } from "react";
import { updateProfile } from "firebase/auth";
import { FiMail, FiUser, FiKey, FiCamera } from "react-icons/fi";
import { useAuth } from "@/firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "@/firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import Image from "next/image";

const BioData: React.FC = () => {
  const { user } = useAuth();
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "/default-avatar.png");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user?.photoURL) setPhotoURL(user.photoURL);
  }, [user]);

  // Handle upload by File object
  const handlePhotoUpload = async (file: File) => {
    if (!user || !file) return;

    setUploading(true);
    setMessage("");

    try {
      const timestamp = Date.now();
      const storageRef = ref(
        storage,
        `profile_pictures/${user.uid}/${timestamp}-${file.name}`
      );

      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      // Update Firebase Auth and Firestore
      await updateProfile(user, { photoURL: downloadURL });
      await setDoc(doc(db, "users", user.uid), { photoURL: downloadURL }, { merge: true });

      setPhotoURL(downloadURL);
      setMessage("✅ Profile picture updated successfully!");
    } catch (error: any) {
      console.error(error);
      setMessage("❌ Upload failed, please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 border border-yellow-400 rounded-lg shadow-lg bg-white max-w-2xl mx-auto mt-16 sm:mt-24">
  <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center sm:text-left">
    Hello, {user?.displayName || "Valued Customer"}!
  </h2>

  <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-6 sm:space-y-0 sm:space-x-6">
    {/* Profile Section */}
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <Image
          src={photoURL}
          alt=""
          width={120}
          height={120}
          className="w-28 h-28 rounded-full object-cover border-2 border-yellow-500"
        />
      </div>

      <label
        htmlFor="photo-upload"
        className={`cursor-pointer bg-yellow-500 text-white py-1 px-4 rounded hover:bg-yellow-600 transition flex items-center gap-2 ${
          uploading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <FiCamera className="w-4 h-4" />
        {uploading ? "Uploading..." : "Upload Photo"}
      </label>
      <input
        id="photo-upload"
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.[0]) handlePhotoUpload(e.target.files[0]);
        }}
        disabled={uploading}
      />
    </div>

    {/* User Info Section */}
    <div className="flex-1 space-y-3 w-full sm:w-auto">
      <div className="flex items-center space-x-2 text-gray-700">
        <FiMail className="text-orange-500" />
        <span>
          <span className="font-semibold">Email:</span> {user?.email || "Not Provided"}
        </span>
      </div>
      <div className="flex items-center space-x-2 text-gray-700">
        <FiKey className="text-orange-500" />
        <span>
          <span className="font-semibold">User ID:</span> {user?.uid?.slice(0, 8)}...
        </span>
      </div>
      <div className="flex items-center space-x-2 text-gray-700">
        <FiUser className="text-orange-500" />
        <span>
          <span className="font-semibold">Name:</span> {user?.displayName || "Guest"}
        </span>
      </div>
    </div>
  </div>

  {/* Message */}
  {message && (
    <p
      className={`mt-4 text-sm text-center sm:text-left ${
        message.includes("successfully") ? "text-green-600" : "text-red-600"
      }`}
    >
      {message}
    </p>
  )}
</div>

  );
};

export default BioData;
