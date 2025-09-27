import { useEffect, useState } from "react";
import { useAuth } from "@/firebase/auth";
import ProtectedRoute from "@/components/common/protectedRoute";
import PlaceOrderButton from "@/components/checkout/PlaceOrderButton";
import { db } from "@/firebase/firebaseConfig";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

const Checkout: React.FC = () => {
  const { user, loading } = useAuth();
  const [userReady, setUserReady] = useState(false); // Tracks if Firestore user doc exists
  const [ensuringUser, setEnsuringUser] = useState(false);

  // Ensure Firestore user document exists
  const ensureUserDocument = async () => {
    if (!user || !user.uid) {
      console.warn("User not logged in or UID missing");
      return;
    }

    // Skip if already ready
    if (userReady) return;

    setEnsuringUser(true);

    try {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid, // store UID
          email: user.email || "",
          displayName: user.displayName || null,
          createdAt: serverTimestamp(),
        });
        console.log("User document created in Firestore");
      } else {
        console.log("User document already exists");
      }

      setUserReady(true);
    } catch (error: any) {
      console.error("Error ensuring user document:", error.message);
      alert("Cannot reach Firestore. Check your network or config.");
    } finally {
      setEnsuringUser(false);
    }
  };

  // Run once when user logs in
  useEffect(() => {
    if (user) {
      ensureUserDocument();
    }
  }, [user]);

  return (
    <ProtectedRoute isAuthenticated={!!user} loading={loading}>
      <div className="mt-20 max-w-3xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold">Checkout</h2>

        {user && <p>Welcome, {user.displayName || user.email}</p>}

        {user && (
          <PlaceOrderButton
            onBeforePlaceOrder={ensureUserDocument}
            disabled={ensuringUser || !userReady}
          />
        )}
      </div>
    </ProtectedRoute>
  );
};

export default Checkout;
