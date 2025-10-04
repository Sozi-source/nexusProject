import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProductCard from "@/components/common/ProductCard";
import { productsProps } from "@/interfaces";

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<productsProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState<productsProps[]>([]);
  const router = useRouter();
  const { search } = router.query;

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://dummyjson.com/products?limit=0`);
        const data = await response.json();
        setProducts(data.products);
        setFilteredProducts(data.products); // initialize
      } catch (error) {
        console.error("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filter when search changes
  useEffect(() => {
    if (search && products.length > 0) {
      const term = (search as string).toLowerCase();
      setFilteredProducts(
        products.filter((p) =>
          [p.title, p.category, p.brand, String(p.price)]
            .some((field) =>
              field?.toString().toLowerCase().includes(term)
            )
        )
      );
    } else {
      setFilteredProducts(products);
    }
  }, [search, products]);

  if (loading) {
    return (
      <p className="m-5 text-blue-500 font-bold animate-bounce">
        Loading...
      </p>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-[5%]">
       {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-4 items-stretch">
          {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />            
          ))}
        </div>
      ) : (
        <p className="text-gray-500">
          No products found {search ? `for "${search}"` : ""}
        </p>
      )}
    </div>
  );
};

export default ProductsPage;
