import { useEffect, useState } from "react";
import { useAuth } from "@/firebase/auth";
import ProtectedRoute from "@/components/common/protectedRoute";
import PlaceOrderButton from "@/components/checkout/PlaceOrderButton";
import OrderList from "@/pages/profile/OrderList";
import { db } from "@/firebase/firebaseConfig";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/router";


const Checkout: React.FC = () => {
  const { user, loading } = useAuth();
  const [userReady, setUserReady] = useState(false);
  const [ensuringUser, setEnsuringUser] = useState(false);
  const {cart, getTotalPrice} =useCart()
  const router= useRouter()

  const ensureUserDocument = async () => {
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
    } catch (error: any) {
      console.error(error);
    } finally {
      setEnsuringUser(false);
    }
  };

  useEffect(() => {
    if (user) ensureUserDocument();
  }, [user]);

  return (
    <ProtectedRoute isAuthenticated={!!user} loading={loading}>
      <div className="flex mt-20 w-full mx-auto px-4 md:px-8 space-y-6">
       {/* left side */}
       <div className="w-1/4">
         {/* Header */}
        <div className="">
          <h2 className="text-3xl font-bold text-gray-800">Checkout</h2>
          
          {user && (
            <p className="mt-2 sm:mt-0 text-gray-600">
              Welcome, <span className="font-medium">{user.displayName || user.email}</span>
            </p>
          )}
        </div>

        {cart.length >0 &&(
            <div className="mt-6">
               <p>Total: ${getTotalPrice().toFixed(2)}</p>
               {/* Place Order Button */}
          
          {user && (
          <PlaceOrderButton
            user={user}
            onBeforePlaceOrder={ensureUserDocument}
            disabled={ensuringUser || !userReady}
          />
        )}
        </div>
        )}
       </div>

        <div>
          {/* Orders List */}
          {user && <OrderList user={user} />}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Checkout;
