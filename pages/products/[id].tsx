import { productsProps } from "@/interfaces"
import { useState, useEffect, useContext } from "react"
import { useRouter } from "next/router"
import Image from "next/image"
import {useCart } from "@/context/CartContext"

export default function ProductDetails(){

    const[product, setProduct]=useState<productsProps|null>(null)
    const[loading, setLoading]=useState(true)
    const {addToCart}= useCart()

    const router= useRouter()
    const {id}=router.query

    useEffect(()=>{
        if(!id) return;
        const fetchProductsDetails=async()=>{

        try {
        setLoading(true)

        const response = await fetch(`https://dummyjson.com/products/${id}`)
        const data = await response.json()
        setProduct(data)
        console.log(data)
            
        } catch (error) {
            console.error("error fetching product") 
        }finally{
         setLoading(false)
        }
        
        }
    fetchProductsDetails()
    },[id])

    if(loading) return <p className="text-blue-500 font-bold">Loading...</p>
    if(!product)return <p>Products not found</p>  
    
    
return(
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6 sm:p-10 mt-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        <div>
        <div className="relative w-full h-64 sm:h-80 md:h-[400px]">
                <Image src={product.thumbnail} 
            alt={product.title} 
            fill
            className="rounded-lg object-cover mx-auto"/>
        </div>
        
        {/* Thumbnail */}
        <div>
            {product.images.map((img, index)=>(
                <Image key={index} 
                src={img} 
                alt={`${product.title} ${index}`}
                width={100} 
                height={100} 
                className="rounded-md border cursor-pointer hover:scale-105 transition"/>
            ))}
        </div>

        </div>
        <div className="space-y-4">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900"> {product.title}</h3>
            <p className="text-gray-500 text-sm sm:text-base">{product.brand} {product.category} </p>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{product.description} </p>

         {/* Pricing */}
         <div className="flex items-center gap-4">
            <span className="text-2xl font-semibold text-green-600">${product.price}</span>
            {product.discountPercentage > 0 && (
              <>
                <span className="line-through text-gray-400">
                  $
                  {(
                    product.price /
                    (1 - product.discountPercentage / 100)
                  ).toFixed(2)}
                </span>
                <span className="bg-red-500 text-white px-2 py-1 rounded-md text-sm">
                  -{product.discountPercentage}%
                </span>
              </>
            )}
          </div>

          {/* Rating and Stock */}
       <p className="text-yellow-500">{product.rating} </p>
       <p className="text-sm text-gray-600">{product.stock > 0 ? `In stock: ${product.stock}` : "Out of stock"} </p>

         {/* Action */}
       <div className="flex gap-4 mt-4">
        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition" onClick={()=>addToCart(product)}>
          Add to Cart</button>
        <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition">
          Buy Now</button>
    </div>
    </div>
    </div>
    </div>
    )
}