import { productsProps } from "@/interfaces"
import { useState, useEffect } from "react"
import ProductCard from "@/components/common/ProductCard"


export default function ProductsPage(){

    const[products, setProducts]=useState<productsProps[]>([])
    const[loading, setLoading]=useState(true)
   

    useEffect(()=>{
        const fetchProducts=async()=>{

        try {
        setLoading(true)

        const response = await fetch("https://dummyjson.com/products?limit=0")
        const data = await response.json()
        setProducts(data.products)
        console.log(data)
            
        } catch (error) {
            console.error("error fetching products", error) 
        }finally{
         setLoading(false)
        }
        
        }
    fetchProducts()
    },[])

    if(loading) return <p className="m-5 text-blue-500 font-bold animate-bounce [animation-delay:-0.2s]">Loading...</p>
     
    
return(
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 m-8">
        {products.map((product)=>(
            <div  key={product.id}>
                <ProductCard product={product}/>
            </div>
        ))}
        </div>
    )
}