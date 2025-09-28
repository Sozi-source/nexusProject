import { useEffect, useState } from "react"
import { productsProps } from "@/interfaces";
import ProductCard from "@/components/common/ProductCard";

interface Category {
  slug: string;
  name: string;
  url: string;
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<productsProps[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const response = await fetch("https://dummyjson.com/products/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories", error);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoadingProducts(true);
        const url = selectedCategory
          ? `https://dummyjson.com/products/category/${selectedCategory}?limit=0`
          : `https://dummyjson.com/products?limit=0`;
        const response = await fetch(url);
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products", error);
      } finally {
        setLoadingProducts(false);
      }
    };
    fetchProducts();
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Left Panel - Categories */}
      <aside className="hidden lg:block w-1/5 bg-white shadow-lg p-4 h-screen overflow-y-auto fixed top-20 ml-3 rounded-md">
        {loadingCategories ? (
          <ul className="ml-5 shadow p-5 bg-white border border-yellow-300 space-y-2 rounded-md">
            {Array.from({ length: 6 }).map((_, i) => (
              <li key={i} className="h-4 w-24 bg-gray-200 animate-pulse rounded"></li>
            ))}
          </ul>
        ) : (
          <ul className="ml-5 shadow p-5 bg-white border border-yellow-300 space-y-2 rounded-md">
            {categories.length > 0 ? (
              categories.map((cat) => (
                <li
                  key={cat.slug}
                  className={`rounded cursor-pointer capitalize text-sm text-gray-900 font-serif px-2 py-1 ${
                    selectedCategory === cat.slug
                      ? "bg-blue-100 font-semibold"
                      : "hover:bg-blue-50"
                  }`}
                  onClick={() => setSelectedCategory(cat.slug)}
                >
                  {cat.name}
                </li>
              ))
            ) : (
              <li className="text-gray-500 italic">No categories available</li>
            )}
          </ul>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-[20%] p-6">
        {/* Hero Section */}
        <div className="shadow bg-yellow-500 text-white text-center py-6 rounded-lg mb-6 mt-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">eDUKA</h1>
          <p className="text-base md:text-lg">
            Discover amazing products and enjoy effortless shopping
          </p>
        </div>

        {/* Products Grid */}
        <h2 className="text-2xl font-bold">
          {selectedCategory ? `Products in ${selectedCategory}`:""}
        </h2>

        {loadingProducts ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-64 bg-gray-200 animate-pulse rounded-md"
              ></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className="text-gray-600">No products found.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
