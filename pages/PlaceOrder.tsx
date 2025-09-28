// pages/PlaceOrder.ts
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";


// Define OrderItem interface
export interface OrderItem {
  id: string;
  productName: string;
  quantity: number;
  price: number;
  imageUrl?: string;
}

const placeOrder = async (items: OrderItem[], userId: string) => {
  try {
    for (const item of items) {
      await addDoc(collection(db, "orders"), {
        userId,
        productName: item.productName,
        quantity: item.quantity,
        price: item.price,
        imageUrl: item.imageUrl,
        status: "pending",
        createdAt: serverTimestamp(),
      });
    }
    console.log("All items placed as individual orders!");
  } catch (error) {
    console.error("Error placing orders:", error);
  }
};
export default placeOrder;