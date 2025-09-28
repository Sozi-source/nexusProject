// import { productsProps } from "@/interfaces";
// import Image from "next/image";
// import Link from "next/link";
// import { useCart } from "@/context/CartContext";
// import { BiCart, BiCartAdd } from "react-icons/bi";

// interface ProductCardProps {
//   product: productsProps;
// }

// const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
//   const {addToCart}= useCart()
//   return (
// <div className="border rounded-lg shadow-md overflow-hidden bg-white hover:shadow-lg transition-shadow duration-200">
//   {/* Image Section */}
//   <div className="relative w-full h-48 sm:h-56 md:h-64 rounded-sm">
//     <Image
//       src={product.thumbnail}
//       alt={product.title}
//       width={250}
//       height={250}
//       className="object-cover rounded-t-lg"
//     />
//   </div>

//   {/* Text Section */}
//   <div className="p-4">
//     <h3 className="text-lg font-semibold mb-1 line-clamp-1">{product.title}</h3>
//     <p className="text-gray-600 mb-1">{product.brand}</p>
//     <p className="text-gray-800 font-medium mb-1">${product.price}</p>
//     <p className="text-gray-500">
//       {product.stock > 0 ? `Stock: ${product.stock}` : "Out of Stock"}
//     </p>
//   </div>

//   {/* Action Buttons */}
//   <div className="flex justify-between items-center px-4 pb-4">
//     <Link
//       href={`/products/${product.id}`}
//       className="font-serif bg-yellow-400 text-white px-4 py-2 rounded-md hover:bg-yellow-500 transition duration-200"
//     >
//       View Details
//     </Link>

//     <button
//       onClick={() => addToCart(product)}
//       className="bg-yellow-400 flex items-center gap-2 px-3 py-2 rounded-md hover:bg-yellow-500 transition transform hover:scale-105"
//     >
//       <BiCart className="h-6 w-6 text-white" />
//       <span className="hidden sm:inline text-white font-medium font-sans">Add to Cart</span>
//     </button>
//   </div>
// </div>
//   );
// };

// export default ProductCard;

import { productsProps } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { BiCart } from "react-icons/bi";

interface ProductCardProps {
  product: productsProps;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="border rounded-lg shadow-md overflow-hidden bg-white hover:shadow-lg transition-shadow duration-200 flex flex-col">
      {/* Image Section */}
      <div className="relative w-full h-40 sm:h-48 md:h-56 lg:h-64">
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw,
                 (max-width: 1024px) 50vw,
                 33vw"
          className="object-cover rounded-t-lg"
          priority
        />
      </div>

      {/* Text Section */}
      <div className="p-3 sm:p-4 flex-1">
        <h3 className="text-base sm:text-lg font-semibold mb-1 line-clamp-1">
          {product.title}
        </h3>
        <p className="text-sm sm:text-base text-gray-600 mb-1">
          {product.brand}
        </p>
        <p className="text-sm sm:text-base text-gray-800 font-medium mb-1">
          ${product.price}
        </p>
        <p className="text-xs sm:text-sm text-gray-500">
          {product.stock > 0 ? `Stock: ${product.stock}` : "Out of Stock"}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2 px-3 sm:px-4 pb-3 sm:pb-4">
        <Link
          href={`/products/${product.id}`}
          className="w-full sm:w-auto text-center font-sans bg-yellow-400 text-white px-3 py-2 rounded-md hover:bg-yellow-500 transition duration-200 text-sm sm:text-base"
        >
          View Details
        </Link>

        <button
          onClick={() => addToCart(product)}
          disabled={product.stock <= 0}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-yellow-400 px-3 py-2 rounded-md hover:bg-yellow-500 transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
        >
          <BiCart className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          <span className="hidden sm:inline text-white font-medium">Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
