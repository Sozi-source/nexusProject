import BioData from "./profile/bioData";
import AccountSettings from "./profile/Settings";
import { User } from "firebase/auth";
import Image from "next/image";

interface OrderListProps {
  user: User;
}

const ProfilePage: React.FC<OrderListProps> = ({ user }) => {
  return (
    <div className="bg-gray-100 min-h-screen px-4 py-4 mt-[10%]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* BioData Card */}
        <div className="flex justify-center">
          <BioData />
        </div>

        {/* Account Settings Card */}
        <div className="flex justify-center">
          <AccountSettings />
        </div>

        {/* side image */}
        <div className="flex justify-center sm:col-span-2 lg:col-span-2">
          <Image 
          src="/assets/images/1.jpg" 
          alt=""
          width={600}
          height={400}/>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
