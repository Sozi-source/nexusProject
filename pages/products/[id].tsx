import { productsProps } from "@/interfaces";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

export default function ProductDetails() {
  const [product, setProduct] = useState<productsProps | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;

    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading)
    return <p className="text-blue-500 font-bold text-center mt-10">Loading...</p>;
  if (!product)
    return <p className="text-center mt-10 text-gray-600">Product not found</p>;

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg border border-yellow-400 sm:p-10 p-6 my-12 mt-[10%]">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        
        {/* Image Section */}
        <div className="w-full">
          <div className="relative w-full h-64 sm:h-80 md:h-[28rem] rounded-lg overflow-hidden shadow-sm">
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Text & Details */}
        <div className="space-y-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{product.title}</h1>
          <p className="text-gray-500 text-sm sm:text-base">{product.brand} &middot; {product.category}</p>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{product.description}</p>

          {/* Pricing */}
          <div className="flex items-center gap-4">
            <span className="text-2xl font-semibold text-green-600">${product.price}</span>
            {product.discountPercentage > 0 && (
              <>
                <span className="line-through text-gray-400">
                  ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                </span>
                <span className="bg-red-500 text-white px-2 py-1 rounded-md text-sm">
                  -{product.discountPercentage}%
                </span>
              </>
            )}
          </div>

          {/* Rating & Stock */}
          <div className="flex items-center gap-4">
            <p className="text-yellow-600 font-lg">⭐<strong>{product.rating}</strong> </p>
            <p className={`text-sm font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
              {product.stock > 0 ? `In stock: ${product.stock}` : "Out of stock"}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-white py-3 rounded-lg font-medium transition font-bold"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>

            <button 
            onClick={()=>router.push("/checkout")}
            className="flex-1 bg-red-400 hover:bg-red-500 text-white py-3 rounded-lg font-medium transition font-bold">
              Buy Now
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
