import { productsProps } from "@/interfaces";
import { useRouter } from "next/router";


interface ProductCardProps {
  product: productsProps;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router= useRouter()
  
  // property click
  const handleClick=()=>{
    router.push(`/products/${product.id}`)
  }



  return (
    <div onClick={handleClick}
    className="rounded-xl overflow-hidden bg-white hover:shadow-lg hover:scale-[1.01] transition-all duration-200 flex flex-col h-full hover:bg-gray-100 shadow">
      {/* Responsive Image Section */}
      <div className="relative w-full h-40 sm:h-56 md:h-60 lg:h-64 px-4 py-3 sm:px-0 sm:py-0">
        <img
          src={product.thumbnail}
          alt={product.title}
          width={0}
          height={0}
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>

      {/* Text Section */}
      <div className="p-3 sm:p-4 flex-1">
        <h3 className="text-black sm:text-lg font-semibold mb-1 line-clamp-1">
          {product.title}
        </h3>
        <p className="text-sm sm:text-base text-gray-800 font-medium mb-1">
          ${product.price}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
