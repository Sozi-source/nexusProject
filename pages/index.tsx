import { useEffect, useState } from "react";
import { productsProps } from "@/interfaces";
import ProductCard from "@/components/common/ProductCard";
import Header from "@/components/Header/header";

interface Category {
  slug: string;
  name: string;
  url: string;
}

const categoryGroups: Record<string, string[]> = {
  electronics: ["smartphones", "laptops"],
  "beauty-skincare": ["fragrances", "skincare"],
  "home-groceries": ["groceries", "home-decoration"],
  fashion: ["mens-shirts", "womens-dresses"],
};

const Home: React.FC = () => {
  const [products, setProducts] = useState<productsProps[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // Set grouped categories for sidebar
  useEffect(() => {
    setLoadingCategories(true);
    const groupedCategories: Category[] = Object.keys(categoryGroups).map((slug) => ({
      name: slug.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase()),
      slug,
      url: "",
    }));
    setCategories(groupedCategories);
    setLoadingCategories(false);
  }, []);

  // Fetch products for selected group
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoadingProducts(true);

        if (!selectedCategory) {
          const res = await fetch(`https://dummyjson.com/products?limit=0`);
          const data = await res.json();
          setProducts(data.products || []);
          return;
        }

        const subCategories = categoryGroups[selectedCategory] || [];
        let productsList: productsProps[] = [];

        for (const cat of subCategories) {
          const res = await fetch(`https://dummyjson.com/products/category/${cat}?limit=0`);
          const data = await res.json();
          productsList = [...productsList, ...(data.products || [])];
        }

        setProducts(productsList);
      } catch (error) {
        console.error("Error fetching products", error);
        setProducts([]);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Header */}
      <Header />

      {/* Sidebar */}
      <aside className="hidden lg:block w-1/5 bg-white shadow-lg p-4 h-screen overflow-y-auto fixed top-20 ml-3 rounded-md">
        {loadingCategories ? (
          <ul className="ml-5 shadow p-5 bg-white border border-yellow-300 space-y-2 rounded-md">
            {Array.from({ length: 4 }).map((_, i) => (
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

        {/* Contact informatio */}
        <div className="ml-5 shadow p-5 bg-white border border-yellow-300 space-y-2 rounded-md mt-5">
          <h4>Contact Us</h4>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-[20%] mt-20 p-6">
        {/* Hero Section */}
        <div className="shadow bg-yellow-500 text-white text-center py-6 rounded-lg mb-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">eDUKA</h1>
          <p className="text-base md:text-lg">
            Discover amazing products and enjoy effortless shopping
          </p>
        </div>

        {/* Products Grid */}
        <h2 className="text-2xl font-bold mb-4">
          {selectedCategory
            ? `Products in ${selectedCategory.replace("-", " ")}`
            : "All Products"}
        </h2>

        {loadingProducts ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-gray-200 animate-pulse rounded-md"
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
