import { useEffect, useState } from "react";
import { productsProps } from "@/interfaces";
import ProductCard from "@/components/common/ProductCard";
import Header from "@/components/Header/header";
import { PhoneCallIcon } from "lucide-react";
import { FaFacebook } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

interface Category {
  slug: string;
  name: string;
}

const categoryGroups: Record<string, string[]> = {
  electronics: ["smartphones", "laptops"],
  "beauty-skincare": ["fragrances", "skincare"],
  "home-groceries": ["groceries", "home-decoration"],
  fashion: ["mens-shirts", "womens-dresses"],
};

// Utility: split array into chunks
function chunkArray<T>(array: T[], chunkSize: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

// ProductRow component
const ProductRow: React.FC<{ products: productsProps[]; bgColor?: string }> = ({
  products,
  bgColor = "bg-white",
}) => {
  return (
    <section className={`${bgColor} py-4 mb-6 shadow-sm w-full`}>
      {/* Mobile: horizontal scroll; Desktop: grid */}
      <div className="flex flex-row gap-4 overflow-x-auto sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {products.map((product) => (
          <div key={product.id} className="flex-shrink-0 w-60 sm:w-auto">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};

const Home: React.FC = () => {
  const [products, setProducts] = useState<productsProps[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // Load categories for sidebar
  useEffect(() => {
    setLoadingCategories(true);
    const groupedCategories: Category[] = Object.keys(categoryGroups).map((slug) => ({
      name: slug.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase()),
      slug,
    }));
    setCategories(groupedCategories);
    setLoadingCategories(false);
  }, []);

  // Fetch products (filtered by selected category)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoadingProducts(true);

        if (!selectedCategory) {
          const res = await fetch(`https://dummyjson.com/products?limit=100`);
          const data = await res.json();
          setProducts(data.products || []);
          return;
        }

        const subCategories = categoryGroups[selectedCategory] || [];
        let productsList: productsProps[] = [];

        for (const cat of subCategories) {
          const res = await fetch(`https://dummyjson.com/products/category/${cat}?limit=100`);
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

  // Split products into rows of 4
  const PRODUCTS_PER_ROW = 5;
  const productRows = chunkArray(products, PRODUCTS_PER_ROW);

  return (
  <div className="min-h-screen w-full flex flex-col bg-red-700">
    {/* Header */}
    <Header />

    {/* Page Layout (Sidebar + Main) */}
    <div className="flex flex-1 w-full">
      {/* Sidebar */}
      <aside className="hidden lg:block w-1/5 shadow-lg p-4 overflow-y-auto fixed top-20 left-0 bottom-0 ml-3 rounded-md">
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

        {/* Contact info */}
        <div className="ml-5 shadow p-5 bg-white border border-yellow-300 space-y-2 rounded-md mt-5">
          <h4 className="text-lg font-bold">Contact Us</h4>
          <p className="flex space-x-2">
            <MdOutlineEmail />
            <a
              href="mailto:osozi.1990@gmail.com"
              className="text-sm text-blue-600 hover:underline"
            >
              osozi.1990@gmail.com
            </a>
          </p>
          <p className="flex space-x-2">
            <PhoneCallIcon />
            <a
              href="+254711390861"
              className="text-sm text-blue-600 hover:underline"
            >
              +254711390861
            </a>
          </p>
          <p className="flex space-x-4">
            <FaFacebook />
            <a
              href="https://web.facebook.com/osozi.wilfred1"
              target="_blank"
              className="text-sm text-blue-600 hover:underline"
            >
              Facebook
            </a>
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-[22%] mt-20 p-6 w-full bg-red-700">
        {/* Hero */}
        <div className="shadow bg-white text-yellow-600 text-center py-6 rounded-lg mb-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">eDUKA</h1>
          <p className="text-base md:text-lg text-gray-800 font-serif">
            Discover amazing products and enjoy effortless shopping!
          </p>
        </div>

        {/* Product Rows */}
        {loadingProducts ? (
          <div className="space-y-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={`skeleton-row-${i}`}
                className="p-4 bg-gray-100 rounded-md shadow animate-pulse grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4"
              >
                {Array.from({ length: PRODUCTS_PER_ROW }).map((_, j) => (
                  <div
                    key={`skeleton-item-${i}-${j}`}
                    className="h-40 bg-gray-300 rounded-md"
                  ></div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <>
            {productRows.map((row, rowIndex) => (
              <ProductRow
                key={`row-${rowIndex}-${row[0]?.id || rowIndex}`}
                products={row}
                bgColor={rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"}
              />
            ))}
          </>
        )}
      </main>
    </div>
  </div>
  );
};

export default Home;
