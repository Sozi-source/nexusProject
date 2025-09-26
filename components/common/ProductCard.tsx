import { productsProps } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";

interface productCardProps{
    product: productsProps
}
const ProductCard:React.FC<productCardProps>=({product})=>{
    

    return(
        <div>
        <Image src={product.thumbnail} alt={product.title} width={200} height={200} className="rounded-md object-cover"/>

        <div>
            <h3>{product.title} </h3>
            <p>{product.brand} </p>
            <p>$ {product.price} </p>
            <p>Stock: {product.stock} </p>
        </div>
        <Link href={`/products/${product.id}`} 
        className="bg-blue-400 hover:bg-blue-500 text-white p-2 rounded-md">View details</Link>
        </div>
    )
}
export default ProductCard;