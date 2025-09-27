// // pages/PlaceOrder.ts
// import { User } from "firebase/auth";
// import { collection, addDoc, serverTimestamp } from "firebase/firestore";
// import { db } from "@/firebase/firebaseConfig";
// import { productsProps } from "@/interfaces";

// export const placeOrder = async (user: User, cartItems: productsProps[]): Promise<boolean> => {
//   if (!user) return false;
//   if (!cartItems || cartItems.length === 0) return false;

//   try {
//     const ordersRef = collection(db, "users", user.uid, "orders");

//     for (const item of cartItems) {
//       if (!item.title || !item.price || !item.quantity) {
//         console.error("Invalid cart item:", item);
//         return false;
//       }

//       await addDoc(ordersRef, {
//         productName: item.title,
//         price: item.price,
//         quantity: item.quantity,
//         date: serverTimestamp(),
//       });
//     }

//     return true;
//   } catch (error) {
//     console.error("Error placing order:", error);
//     return false;
//   }
// };

// pages/PlaceOrder.ts
import { User } from "firebase/auth";
import {
  collection,
  addDoc,
  serverTimestamp,
  writeBatch,
  doc,
} from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { productsProps } from "@/interfaces";

export const placeOrder = async (
  user: User,
  cartItems: productsProps[]
): Promise<{ success: boolean; orderId?: string }> => {
  if (!user) return { success: false };
  if (!cartItems || cartItems.length === 0) return { success: false };

  try {
    // Step 1: create parent order doc
    const orderRef = await addDoc(collection(db, "users", user.uid, "orders"), {
      status: "pending",
      totalAmount: cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
      createdAt: serverTimestamp(),
    });

    // Step 2: add all items under a subcollection (batch for performance)
    const batch = writeBatch(db);
    const itemsRef = collection(orderRef, "items");

    cartItems.forEach((item) => {
      const itemDoc = doc(itemsRef); // auto-ID
      batch.set(itemDoc, {
        productName: item.title,
        price: item.price,
        quantity: item.quantity,
      });
    });

    await batch.commit();

    return { success: true, orderId: orderRef.id };
  } catch (error) {
    console.error("Error placing order:", error);
    return { success: false };
  }
};
