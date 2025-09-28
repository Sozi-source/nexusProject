import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  orderBy,
  where,
  onSnapshot,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { User } from "firebase/auth";
import Image from "next/image";

interface OrderListProps {
  user: User;
}

interface OrderItem {
  id: string;
  productName: string;
  quantity: number;
  price: number;
  status?: string; // pending, cancelled
  imageUrl?: string;
}

interface Order {
  id: string;
  items: OrderItem[];
  status: string;
  createdAt: any;
}

const OrderList: React.FC<OrderListProps> = ({ user }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // -----------------------------
  // Fetch Orders
  // -----------------------------
  useEffect(() => {
    if (!user) return;
    if (typeof window === "undefined") return;

    setLoading(true);

    const q = query(
      collection(db, "orders"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetchedOrders = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() } as Order))
          .filter((order) => order.status === "pending");
        setOrders(fetchedOrders);
        setLoading(false);
      },
      async (error) => {
        console.error("Firestore snapshot error:", error);
        const snapshot = await getDocs(q);
        const fetchedOrders = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() } as Order))
          .filter((order) => order.status === "pending");
        setOrders(fetchedOrders);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  // -----------------------------
  // Cancel Item
  // -----------------------------
  const handleCancelItem = async (orderId: string, itemId: string) => {
    try {
      const orderRef = doc(db, "orders", orderId);
      const order = orders.find((o) => o.id === orderId);
      if (!order) return;

      const updatedItems = order.items.filter((item) => item.id !== itemId);
      const newStatus = updatedItems.length === 0 ? "cancelled" : order.status;

      await updateDoc(orderRef, {
        items: updatedItems,
        status: newStatus,
      });

      setOrders((prevOrders) =>
        prevOrders.map((o) =>
          o.id === orderId ? { ...o, items: updatedItems, status: newStatus } : o
        )
      );
    } catch (error) {
      console.error("Error cancelling item:", error);
    }
  };

  // -----------------------------
  // Loading / Empty State
  // -----------------------------
  if (loading)
    return <p className="text-center py-6 text-gray-500">Loading orders...</p>;

  if (orders.length === 0)
    return <p className="text-center py-6 text-gray-500">No orders yet.</p>;

  // -----------------------------
  // Render Orders
  // -----------------------------
  return (
    <div className="w-full px-4 sm:px-6 md:px-8 mt-6 sm:mt-10 space-y-6">
      {orders.map((order) => (
        // Parent Card
        <div
          key={order.id}
          className="w-full border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow p-4 sm:p-6 flex flex-col"
        >
          {/* Order Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
            <p className="font-semibold text-yellow-500 break-all text-sm sm:text-base">
              Order ID: <span className="text-blue-500">{order.id}</span>
            </p>
          </div>

          {/* Items Container */}
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {order.items.map((item: OrderItem) => (
              // Child Card
              <div
                key={item.id}
                className="flex flex-col border rounded-lg p-3 bg-gray-50 hover:bg-gray-100 transition"
              >
                {/* Product Image */}
                {item.imageUrl && (
                  <div className="flex justify-center">
                    <Image
                      src={item.imageUrl}
                      alt={item.productName}
                      width={150}
                      height={150}
                      className="object-cover rounded mb-3 w-full h-32 sm:h-36 md:h-40"
                    />
                  </div>
                )}

                {/* Product Info */}
                <div className="flex flex-col gap-1 text-sm sm:text-base">
                  <span className="font-semibold text-gray-800">
                    {item.productName}
                  </span>
                  <span className="text-gray-600">Qty: {item.quantity}</span>
                  <span className="text-gray-600">Price: ${item.price}</span>
                  {item.status === "cancelled" && (
                    <span className="text-red-500 font-medium">
                      (Cancelled)
                    </span>
                  )}
                </div>

                {/* Cancel Button */}
                {item.status !== "cancelled" && (
                  <button
                    onClick={() => handleCancelItem(order.id, item.id)}
                    className="mt-3 bg-yellow-500 hover:bg-yellow-600 text-white text-xs sm:text-sm px-3 py-1 rounded w-fit self-start"
                  >
                    Cancel Item
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Order Date + Status */}
          <div className="flex flex-col sm:flex-row sm:justify-between mt-4 text-xs sm:text-sm text-gray-500">
            {order.createdAt && (
              <p>
                Ordered on:{" "}
                {order.createdAt?.toDate?.()?.toLocaleString() || ""}
              </p>
            )}
            <p>
              Status:{" "}
              <span
                className={`font-medium ${
                  order.status === "pending"
                    ? "text-red-500"
                    : "text-green-600"
                }`}
              >
                {order.status}
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderList;
