import React from "react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { useAuth } from "@/firebase/auth";
import { useRouter } from "next/router";
import Link from "next/link";

const Cart: React.FC = () => {
  const { cart, removeFromCart, incrementQuantity, decrementQuantity, getTotalPrice } =
    useCart();
  const router = useRouter();
  const { user } = useAuth();

  return (
    <div className="bg-gray-100 pt-20 mt-8 min-h-screen">
      <div className="max-w-5xl mx-auto p-6 shadow-lg bg-white rounded-lg">
        <h3 className="text-2xl font-bold mb-6 text-gray-800">
          Cart ({cart.length})
        </h3>

        {cart.length === 0 ? (
          <p className="text-lg sm:text-xl font-semibold text-gray-700">
            Your cart is empty,{" "}
            <Link
              href="/"
              className="text-yellow-600 font-medium hover:underline"
            >
              continue shopping
            </Link>
          </p>
        ) : (
          <div className="space-y-6">
            {/* Cart Items */}
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-center sm:items-start gap-4 border-b pb-4"
              >
                {/* Product Image */}
                <div className="flex-shrink-0">
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    height={100}
                    width={100}
                    className="object-cover rounded-md"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 text-center sm:text-left">
                  <h1 className="font-medium text-lg text-gray-800">
                    {item.title}
                  </h1>
                  <h2 className="text-lg text-gray-700 font-serif">
                    ${item.price}
                  </h2>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="mt-3 text-red-500 font-semibold hover:text-red-600"
                  >
                    Remove
                  </button>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => incrementQuantity(item.id)}
                    className="w-10 h-10 flex items-center justify-center rounded-md bg-yellow-500 text-white hover:bg-yellow-600 transition text-xl font-extrabold"
                  >
                    +
                  </button>
                  <span className="text-gray-800">{item.quantity}</span>
                  <button
                    onClick={() => decrementQuantity(item.id)}
                    disabled={item.quantity <= 1}
                    className={`w-10 h-10 flex items-center justify-center rounded-md border text-xl font-extrabold transition
                      ${
                        item.quantity <= 1
                          ? "text-gray-400 cursor-not-allowed bg-gray-100"
                          : "bg-yellow-500 text-white hover:bg-yellow-600"
                      }`}
                  >
                    -
                  </button>
                </div>
              </div>
            ))}

            {/* Checkout Card */}
            {cart.length > 0 && (
              <div className="bg-gray-50 rounded-lg shadow-md p-6 mt-6">
                <h4 className="font-bold text-xl text-gray-800 border-b pb-3">
                  Cart Summary
                </h4>
                <p className="mt-4 text-lg font-medium text-gray-700">
                  Total: ${getTotalPrice().toFixed(2)}
                </p>
                <button
                  className="mt-5 w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg font-semibold transition"
                  onClick={() => router.push("/checkout")}
                >
                  Proceed to Checkout (${getTotalPrice().toFixed(2)})
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
