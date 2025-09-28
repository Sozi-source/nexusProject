// import { useEffect, useState } from "react";
// import { useAuth } from "@/firebase/auth";
// import ProtectedRoute from "@/components/common/protectedRoute";
// import PlaceOrderButton from "@/components/checkout/PlaceOrderButton";
// import OrderList from "@/pages/profile/OrderList";
// import { db } from "@/firebase/firebaseConfig";
// import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
// import { useCart } from "@/context/CartContext";

// const Checkout: React.FC = () => {
//   const { user, loading } = useAuth();
//   const [userReady, setUserReady] = useState(false);
//   const [ensuringUser, setEnsuringUser] = useState(false);
//   const { cart, getTotalPrice } = useCart();

//   const ensureUserDocument = async () => {
//     if (!user?.uid) return;
//     if (userReady || ensuringUser) return;

//     setEnsuringUser(true);
//     try {
//       const userRef = doc(db, "users", user.uid);
//       const userSnap = await getDoc(userRef);

//       if (!userSnap.exists()) {
//         await setDoc(userRef, {
//           uid: user.uid,
//           email: user.email || "",
//           displayName: user.displayName || "",
//           createdAt: serverTimestamp(),
//         });
//         console.log("User document created");
//       } else {
//         console.log("User already exists");
//       }

//       setUserReady(true);
//     } catch (error: unknown) {
//       console.error(error);
//     } finally {
//       setEnsuringUser(false);
//     }
//   };

//   useEffect(() => {
//     if (user) ensureUserDocument();
//   }, [user, ensuringUser, userReady, ensureUserDocument]);

//   return (
//     <ProtectedRoute isAuthenticated={!!user} loading={loading}>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 mt-6 sm:mt-[5%]">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          
//           {/* Left Section - Checkout Card */}
//           <div className="lg:col-span-1 space-y-6">
//             <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
//               <h2 className="text-xl sm:text-2xl font-bold text-yellow-600">Order Summary</h2>

//               {user && (
//                 <p className="mt-2 text-gray-600 text-sm sm:text-base">
//                   Welcome,{" "}
//                   <span className="font-medium text-gray-900">
//                     {user.displayName || user.email}
//                   </span>
//                 </p>
//               )}

//               {cart.length > 0 && (
//                 <div className="bg-gray-50 shadow-inner rounded-lg p-4 sm:p-6 mt-5">
//                   <p className="text-base sm:text-lg font-semibold text-gray-600">
//                     Total:{" "}
//                     <span className="text-blue-600 text-lg sm:text-xl">
//                       ${getTotalPrice().toFixed(2)}
//                     </span>
//                   </p>

//                   {user && (
//                     <div className="mt-4">
//                       <PlaceOrderButton
//                         user={user}
//                         onBeforePlaceOrder={ensureUserDocument}
//                         disabled={ensuringUser || !userReady}
//                       />
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Right Section - Orders List */}
//           <div className="lg:col-span-2">
//             <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
//               <h3 className="text-lg sm:text-xl font-semibold text-yellow-600 mb-4">
//                 Your Orders
//               </h3>
//               {user && <OrderList user={user} />}
//             </div>
//           </div>

//         </div>
//       </div>
//     </ProtectedRoute>
//   );
// };

// export default Checkout;

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/firebase/auth";
import ProtectedRoute from "@/components/common/protectedRoute";
import PlaceOrderButton from "@/components/checkout/PlaceOrderButton";
import OrderList from "@/pages/profile/OrderList";
import { db } from "@/firebase/firebaseConfig";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { useCart } from "@/context/CartContext";

const Checkout: React.FC = () => {
  const { user, loading } = useAuth();
  const [userReady, setUserReady] = useState(false);
  const [ensuringUser, setEnsuringUser] = useState(false);
  const { cart, getTotalPrice } = useCart();

  const ensureUserDocument = useCallback(async () => {
    if (!user?.uid) return;
    if (userReady || ensuringUser) return;

    setEnsuringUser(true);
    try {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email || "",
          displayName: user.displayName || "",
          createdAt: serverTimestamp(),
        });
        console.log("User document created");
      } else {
        console.log("User already exists");
      }

      setUserReady(true);
    } catch (error: unknown) {
      console.error(error);
    } finally {
      setEnsuringUser(false);
    }
  }, [user, userReady, ensuringUser]);

  useEffect(() => {
    if (user) ensureUserDocument();
  }, [user, ensureUserDocument]);

  return (
    <ProtectedRoute isAuthenticated={!!user} loading={loading}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 mt-6 sm:mt-[5%]">
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          
           {/* Left Section - Checkout Card */}
           <div className="lg:col-span-1 space-y-6">
             <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
               <h2 className="text-xl sm:text-2xl font-bold text-yellow-600">Order Summary</h2>
               {user && (
                <p className="mt-2 text-gray-600 text-sm sm:text-base">
                  Welcome,{" "}
                  <span className="font-medium text-gray-900">
                    {user.displayName || user.email}
                  </span>
                </p>
              )}

              {cart.length > 0 && (
                <div className="bg-gray-50 shadow-inner rounded-lg p-4 sm:p-6 mt-5">
                  <p className="text-base sm:text-lg font-semibold text-gray-600">
                    Total:{" "}
                    <span className="text-blue-600 text-lg sm:text-xl">
                      ${getTotalPrice().toFixed(2)}
                    </span>
                  </p>

                  {user && (
                    <div className="mt-4">
                      <PlaceOrderButton
                        user={user}
                        onBeforePlaceOrder={ensureUserDocument}
                        disabled={ensuringUser || !userReady}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Section - Orders List */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold text-yellow-600 mb-4">
                Your Orders
              </h3>
              {user && <OrderList user={user} />}
            </div>
          </div>

        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Checkout;
