import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { productsProps } from "@/interfaces";


interface Category {
  slug: string;
  name: string;
  url: string;
}

const Home: React.FC = () => {
  const router = useRouter();
  const [products, setProducts] = useState<productsProps[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const {addToCart}= useCart()

  // Fetch categories from DummyJSON
 
useEffect(() => {
  const fetchCategories = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products/categories");
      const data = await response.json();
      setCategories(data); 
    } catch (error) {
      console.error("Error fetching categories", error);
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
      <div className="w-1/5 bg-white shadow-lg p-4 h-screen overflow-y-auto fixed top-20">
        {loadingCategories ? (
          <p>Loading categories...</p>
        ) : (
          <ul className="ml-10 shadow p-5 bg-white">
            {categories.map((cat) => (
              <li
                key={cat.slug}
                className={`rounded cursor-pointer capitalize text-sm text-gray-900 font-serif ${
                  selectedCategory === cat.slug ? "bg-blue-100 font-semibold" : "hover:bg-blue-100"
                }`}
                onClick={() => setSelectedCategory(cat.slug)}
              >
                {cat.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-[20%] p-6">
        {/* Hero Section */}
        <div className="bg-red-700 text-white text-center py-12 rounded-lg mb-6 mt-20">
          <h1 className="text-5xl font-bold mb-2">SHOPLY</h1>
          <p className="text-lg md:text-xl">
            Discover amazing products and enjoy effortless shopping
          </p>
        </div>

        {/* Products Grid */}
        <h2 className="text-2xl font-bold mb-4">
          {selectedCategory ? `Products in ${selectedCategory}` : "Featured Products"}
        </h2>
        {loadingProducts ? (
          <p>Loading products...</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
              >
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  width={200}
                  height={200}
                  className="w-full h-48 object-contain mb-4 rounded-lg"
                />
                <h3 className="font-semibold text-gray-800">{product.title}</h3>
                <p className="text-black font-bold">KSh {product.price}</p>
                <button className="bg-yellow-500 p-2 rounded-md text-white font-bold w-full" onClick={()=>addToCart(product)}>Add to Cart</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
