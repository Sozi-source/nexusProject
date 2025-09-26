import React from "react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { useAuth } from "@/firebase/auth"
import { useRouter } from "next/router";
import Link from "next/link";


const Cart: React.FC = () => {
const{cart, removeFromCart, incrementQuantity, decrementQuantity, getTotalPrice}=useCart()
const router = useRouter()
const {user}= useAuth();

return(
    <div className="bg-gray-100 pt-20 mt-8">
        <div className="max-w-4xl mx-auto p-6 shadow bg-white">
        <h3 className="text-2xl font-bold mb-6">Cart ({cart.length})</h3>
        {cart.length===0?(
            <p>Your cart is empty. <Link href="/">Continue Shopping</Link></p>
        ):(
            <div>
                {cart.map((item, index)=>(
                    <div key={index} className="flex items-center gap-4 border-b-1">
                        <div>
                            <Image src={item.thumbnail} 
                            alt={item.title} 
                            height={100} 
                            width={100} className="object-cover rounded-md"/>
                        </div>

                        <div className="flex-1">
                            <h1 className="font-medium text-lg">{item.title} </h1>
                            <h2 className="text-lg text-black font-serif">$ {item.price} </h2>
                            
                        <button onClick={()=>removeFromCart(item.id)} className="mt-3 text-yellow-500 font-extrabold hover:text-yellow-600">Remove</button>
                        </div>
                        <div className="flex items-center space-x-3">
                            
                        <button onClick={()=>incrementQuantity(item.id)}
                            className="w-8 h-8 flex items-center justify-center rounded-sm bg-yellow-500 text-white hover:bg-yellow-600 transition text-xl font-extrabold w-10 h-10">+</button>
                        <span>{item.quantity}</span>
                       
                        <button onClick={()=>decrementQuantity(item.id)}
                                disabled={item.quantity <=1}
                                className={`w-10 h-10 flex items-center justify-center rounded-md bg-yellow-500 border text-xl font-extrabold transition
                            ${item.quantity <= 1 
                                ? "text-white cursor-not-allowed bg-gray-50" 
                                : "text-white hover:bg-yellow-600"}`}>-</button>
                        </div>
                    </div>
                ))}

                {/* checkout */}
                {cart.length >0 &&(
                    <div className="mt-6">
                        <h4>CART SUMMARY</h4>
                        <p>Total: ${getTotalPrice().toFixed(2)}</p>
                        <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg font-semibold" onClick={()=>router.push("/checkout")}>
                        Proceed to checkout 
                        (${getTotalPrice().toFixed(2)})
                    </button>
                    </div>
                )}
            </div>
        )}
 </div>
</div>
)
};

export default Cart;