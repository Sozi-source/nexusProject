import React, { useState } from "react";
import { db } from "@/firebase/firebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useCart } from "@/context/CartContext";
import { User } from "firebase/auth";

interface PlaceOrderButtonProps {
  user: User;
  onBeforePlaceOrder?: () => Promise<void>;
  disabled?: boolean;
}

const PlaceOrderButton: React.FC<PlaceOrderButtonProps> = ({
  user,
  onBeforePlaceOrder,
  disabled = false,
}) => {
  const { cart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (loading) return;
    setLoading(true);

    try {
      if (onBeforePlaceOrder) await onBeforePlaceOrder();

      if (!cart || cart.length === 0) {
        alert("Your cart is empty!");
        return;
      }

      // Save order under user's subcollection
      const orderRef = await addDoc(collection(db, "orders"), {
        userId: user.uid,
        email: user.email,
        displayName: user.displayName,
        items: cart,
        status: "pending",
        createdAt: serverTimestamp(),
      });

      console.log("Order placed with ID:", orderRef.id);
      alert("Order placed successfully!");
      clearCart();
    } catch (error: any) {
      console.error("Error placing order:", error);
      alert(error.message || "There was an error placing your order. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled || loading}
      className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
    >
      {loading ? "Processing..." : "Place Order"}
    </button>
  );
};

export default PlaceOrderButton;
