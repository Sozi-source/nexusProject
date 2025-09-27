// import React, { useEffect, useState } from "react";
// import { onAuthStateChanged, User } from "firebase/auth";
// import { auth } from "@/firebase/firebaseConfig";
// import BioData from "@/components/profile/bioData";
// import OrderList from "@/components/profile/OrderList";
// import AccountSettings from "@/components/profile/accountSettings";


// const Profile: React.FC = () => {
//     const[user, setUser]= useState<User|null>(null);

//     useEffect(()=>{
//         const unsubscribe = onAuthStateChanged(auth, (firebaseUser)=>{
//             if(firebaseUser){
//                 setUser(firebaseUser)
//             }else{
//                 setUser(null);
//             }

//         })

//         return ()=> unsubscribe()
//     }, [])

//     if(!user) return <p className="mt-20 text-center">Loading user data...</p>




//     return (
//         <div className=" lg:flex-row w-full mx-auto px-4 sm:px-6 lg:px-8 mt-20 gap-8">
//              <section className="flex-1 min-w-[280px] lg:max-w-xs">
//                 <BioData user={user}/>
//             </section>

//             <section className="flex-2 min-w-[300px] lg:flex-1">
//                 <OrderList user={user} />
//             </section>

//             <section className="flex-1 min-w-[280px] lg:max-w-xs">
//                 <AccountSettings user={user}/>
//             </section>
//            </div>
//     );
// };

// export default Profile;

import React, { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";
import BioData from "@/pages/profile/bioData";
import OrderList from "@/pages/profile/OrderList";
import AccountSettings from "@/pages/profile/accountSettings";

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser || null);
    });

    return () => unsubscribe();
  }, []);

  if (!user)
    return <p className="mt-20 text-center text-gray-500">Loading user data...</p>;

  return (
    <div className="bg-gray-100 min-h-screen">
        <div className="w-full px-4 sm:px-6 lg:px-8 mt-20">
      <div className="lg:flex lg:gap-8">
        {/* Sidebar: BioData + AccountSettings */}
        <aside className="flex flex-col gap-6 lg:w-1/4 min-w-[280px]">
          <BioData user={user} />
          <AccountSettings user={user} />
        </aside>

        {/* Main content: Orders */}
        <main className="flex-1 mt-6 lg:mt-0">
          <OrderList user={user} />
        </main>
      </div>
    </div>
    </div>
  );
};

export default Profile;
