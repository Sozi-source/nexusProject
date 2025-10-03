import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/firebase/auth";
import ProtectedRoute from "@/components/common/protectedRoute";
import PlaceOrderButton from "@/components/checkout/PlaceOrderButton";
import OrderList from "@/pages/profile/OrderList";
import { db } from "@/firebase/firebaseConfig";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

const Checkout: React.FC = () => {
  const { user, loading } = useAuth();
  const [userReady, setUserReady] = useState(false);
  const [ensuringUser, setEnsuringUser] = useState(false);
  const { cart, getTotalPrice } = useCart();

  // Ensure user doc exists in Firestore
  const ensureUserDocument = useCallback(async () => {
    if (!user?.uid || userReady || ensuringUser) return;

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
    } catch (error) {
      console.error("Error ensuring user document:", error);
    } finally {
      setEnsuringUser(false);
    }
  }, [user, userReady, ensuringUser]);

  useEffect(() => {
    if (user) ensureUserDocument();
  }, [user, ensureUserDocument]);

  return (
    <ProtectedRoute isAuthenticated={!!user} loading={loading}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 mt-6 sm:mt-[10%] border border-gray-200">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Left Section - Place Order */}
          <div className="lg:col-span-1 sticky top-20 self-start">
            <div className="bg-white rounded-lg shadow p-4 sm:p-6 space-y-6 border border-yellow-200">
              <h3 className="text-lg sm:text-xl font-semibold text-yellow-600">
                Checkout
              </h3>

              {cart.length > 0 ? (
                <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
                  <p className="text-base sm:text-lg font-semibold text-gray-700">
                    Total:{" "}
                    <span className="text-blue-600 text-lg sm:text-xl">
                      ${getTotalPrice().toFixed(2)}
                    </span>
                  </p>

                  {user && (
                    <div className="mt-4">
                      <h4 className="text-gray-600 mb-2">Order Summary</h4>
                      <PlaceOrderButton
                        user={user}
                        onBeforePlaceOrder={ensureUserDocument}
                        disabled={ensuringUser || !userReady}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-500">Your cart is empty, <Link href={"/products"}className="text-blue-600">continue shopping</Link></p>
              )}
            </div>
          </div>

          {/* Right Section - Orders List */}
          <div className="lg:col-span-2">
            <div className="bg-white border rounded-lg shadow p-4 sm:p-6 border border-yellow-200">
              <h3 className="text-lg sm:text-xl font-semibold text-yellow-600 mb-4">
                Your Orders
              </h3>
              {user ? (
                <OrderList user={user} />
              ) : (
                <p className="text-gray-500">Log in to view your orders.</p>
              )}
            </div>
          </div>

        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Checkout;
