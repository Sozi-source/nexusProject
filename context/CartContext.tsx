import { CartContextprops, productsProps } from "@/interfaces";
import { createContext, ReactNode, useContext, useState } from "react";


export const CartContext= createContext<CartContextprops|null>(null)

export const useCart =()=>{
    const context= useContext(CartContext)
    if(!context) throw new Error("Wrap the components inside the CartProvider")
        return context;
}

export const CartProvider=({children}:{children:ReactNode})=>{
    const[cart, setCart]= useState<productsProps[]>([])

    // add ti cart
    const addToCart=(item:productsProps)=>{
       setCart((prev)=>{
        const exist = prev.find((cartItem)=> cartItem.id === item.id)
        if(exist) return prev;
        return [...prev, {...item, quantity:1}]
       })
}

    // remove from cart
    const removeFromCart =(id:number)=>{
        setCart((prev)=>prev.filter((product)=>product.id !==id))
    }

    // increment product quantity
    const incrementQuantity =(id:number)=>{
        setCart((prev)=> 
            prev.map((cartItem)=>
                cartItem.id===id? {...cartItem, quantity:(cartItem.quantity||1)+1}:cartItem))
    }

    // decrement product quantity
     const decrementQuantity =(id:number)=>{
        setCart((prev)=> 
            prev.map((cartItem)=>
                cartItem.id===id? {...cartItem, quantity:(cartItem.quantity||1)-1}
        :cartItem
    )
    .filter((cartItem) => (cartItem.quantity??0) > 0)
    )
    
    }

    // Clear cart
  const clearCart = () => setCart([]);

//   calculate the cumulative price
    const getTotalPrice = () => {
  return cart.reduce((total, item) => {
    return total + (item.price * (item.quantity ?? 1));
  }, 0);
};


return(
    <CartContext.Provider value={{cart, addToCart, removeFromCart, incrementQuantity, decrementQuantity, getTotalPrice, clearCart}}>
        {children}
    </CartContext.Provider>
)
}



