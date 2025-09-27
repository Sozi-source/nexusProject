// import { useEffect, useState } from "react";
// import { db } from "@/firebase/firebaseConfig";
// import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
// import { useAuth } from "@/firebase/auth";
// import { Orderprops } from "@/interfaces";

// const OrdersList: React.FC = () => {
//   const { user } = useAuth();
//   const [orders, setOrders] = useState<Orderprops[]>([]);

//   useEffect(() => {
//     if (!user) return;

//     // reference orders subcollection
//     const q = query(
//       collection(db, "users", user.uid, "orders"),
//       orderBy("createdAt", "desc")
//     );

//     // live listener
//   const unsubscribe = onSnapshot(q, (snapshot) => {
//   const ordersData = snapshot.docs.map((doc) => {
//     const data = doc.data() as Omit<Orderprops, "id">; 
//     return {
//       id: doc.id,
//       ...data,
//     };
//   });

//   setOrders(ordersData as Orderprops[]);
// });

//     return () => unsubscribe();
//   }, [user]);

//   return (
//     <div>
//       <h2 className="text-lg font-semibold mb-4">Your Orders</h2>
//       {orders.length === 0 ? (
//         <p>No orders found.</p>
//       ) : (
//         <ul className="space-y-3">
//           {orders.map((order) => (
//             <li key={order.id} className="border p-3 rounded">
//               <p><strong>Product:</strong> {order.productName}</p>
//               <p><strong>Price:</strong> ${order.price}</p>
//               <p><strong>Status:</strong> {order.status}</p>
//               <p><strong>Date:</strong> {order.createdAt?.toDate().toLocaleString()}</p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default OrdersList;

import { useEffect, useState } from "react";
import { db } from "@/firebase/firebaseConfig";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import { useAuth } from "@/firebase/auth";

interface OrderItem {
  id: string;
  productName: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  status: string;
  totalAmount: number;
  createdAt: Date | null;
  items: OrderItem[];
}

const OrdersList: React.FC = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "users", user.uid, "orders"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const ordersData: Order[] = await Promise.all(
        snapshot.docs.map(async (docSnap) => {
          const data = docSnap.data();
          const itemsSnap = await getDocs(
            collection(docSnap.ref, "items")
          );

          const items: OrderItem[] = itemsSnap.docs.map((itemDoc) => ({
            id: itemDoc.id,
            ...(itemDoc.data() as Omit<OrderItem, "id">),
          }));

          return {
            id: docSnap.id,
            status: data.status,
            totalAmount: data.totalAmount,
            createdAt: data.createdAt?.toDate() || null,
            items,
          };
        })
      );

      setOrders(ordersData);
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <div>
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id} className="border p-4 mb-3 rounded">
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Total:</strong> ${order.totalAmount.toFixed(2)}</p>
              <p><strong>Date:</strong> {order.createdAt?.toLocaleString()}</p>
              <ul className="ml-4 mt-2">
                {order.items.map((item) => (
                  <li key={item.id}>
                    {item.productName} - ${item.price} x {item.quantity}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrdersList;

