// components/checkout/PlaceOrderButton.tsx
import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/firebase/auth";
import { placeOrder } from "@/pages/PlaceOrder";

const PlaceOrderButton: React.FC = () => {
  const { cart, clearCart } = useCart(); // assuming you have a function to clear the cart after order
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePlaceOrder = async () => {
    if (!user) {
      setError("You must be signed in to place an order.");
      return;
    }

    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const success = await placeOrder(user, cart);

      if (success) {
        alert("Order placed successfully!");
        clearCart(); // clear the cart after successful order
      } else {
        setError("Failed to place order. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <button
        onClick={handlePlaceOrder}
        disabled={loading}
        className="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 transition"
      >
        {loading ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
};

export default PlaceOrderButton;
