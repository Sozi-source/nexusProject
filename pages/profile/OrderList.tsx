import React, { useEffect, useState } from "react";
import { collection, query, orderBy, where, onSnapshot, getDocs, updateDoc, doc } from "firebase/firestore";
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
    <div className="w-full px-4 md:px-8 mt-10 space-y-6">
      {orders.map((order) => (
        // Parent Card
        <div
          key={order.id}
          className="w-full border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow p-6 flex flex-col"
        >
          {/* Order Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
            <p className="font-semibold text-gray-800 break-all">
              Order ID: {order.id}
            </p>
            <p className="mt-2 sm:mt-0 text-sm sm:text-base text-gray-600">
              Status:{" "}
              <span
                className={`font-medium ${
                  order.status === "pending" ? "text-yellow-600" : "text-green-600"
                }`}
              >
                {order.status}
              </span>
            </p>
          </div>

          {/* Items Container */}
          <div className="flex flex-wrap gap-4">
            {order.items.map((item: OrderItem) => (
              // Child Card
              <div
                key={item.id}
                className="flex-1 min-w-[200px] max-w-[250px] border rounded-lg p-3 bg-gray-50 hover:bg-gray-100 transition flex flex-col justify-between"
              >
                {/* Product Image */}
                {item.imageUrl && (
                  <Image
                    src={item.imageUrl}
                    alt={item.productName}
                    width={150}
                    height={150}
                    className="object-cover rounded mb-3"
                  />
                )}

                {/* Product Info */}
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-gray-800">{item.productName}</span>
                  <span className="text-gray-600 text-sm">Qty: {item.quantity}</span>
                  <span className="text-gray-600 text-sm">Price: ${item.price}</span>
                  {item.status === "cancelled" && (
                    <span className="text-red-500 font-medium">(Cancelled)</span>
                  )}
                </div>

                {/* Cancel Button */}
                {item.status !== "cancelled" && (
                  <button
                    onClick={() => handleCancelItem(order.id, item.id)}
                    className="mt-3 bg-yellow-500 hover:bg-yellow-600 text-white text-xs px-3 py-1 rounded w-auto self-start"
                  >
                    Cancel Item
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Order Date */}
          {order.createdAt && (
            <p className="mt-4 text-xs text-gray-400">
              Ordered on: {order.createdAt?.toDate?.()?.toLocaleString() || ""}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default OrderList;
