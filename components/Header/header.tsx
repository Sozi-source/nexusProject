import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/firebase/auth";
import { ShoppingCart, Menu, X } from "lucide-react";
import UserDropdown from "./userDropDown";

const Header: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cart } = useCart();
  const { user, signOut } = useAuth();
  const router = useRouter();

  return (
    <header className="w-full bg-white shadow-md fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div
            className="text-2xl font-bold text-yellow-600 cursor-pointer"
            onClick={() => router.push("/")}
          >
            eDUKA
          </div>

          {/* Desktop Search & Nav */}
          <div className="hidden md:flex flex-1 items-center mx-6">
            {/* Search */}
            <form className="flex flex-1 max-w-md gap-2">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products"
                className="w-full rounded-l-lg border border-gray-300 px-4 py-2 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-yellow-500 text-white px-4 py-2 rounded-r-lg hover:bg-yellow-600 transition"
              >
                Search
              </button>
            </form>

            {/* Navigation */}
            <nav className="ml-5">
              <ul className="flex space-x-6 text-gray-700 font-medium">
                <li className="hover:text-orange-400">
                  <Link href="/">Home</Link>
                </li>
                <li className="hover:text-orange-400">
                  <Link href="/profile">Profile</Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <div
              className="relative cursor-pointer"
              onClick={() => router.push("/cart")}
            >
              <ShoppingCart className="w-8 h-8 text-yellow-600" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs rounded-full px-2">
                  {cart.length}
                </span>
              )}
            </div>

            {/* Auth */}
            {user ? (
              <div className="relative hidden md:block">
                <UserDropdown user={user} signOut={signOut} />
              </div>
            ) : (
              <Link
                href="/authPage"
                className="hidden md:inline-block bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
              >
                Login
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md border-t border-gray-200">
          <div className="px-4 py-4 space-y-4">
            <form className="flex gap-2">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products"
                className="flex-1 rounded-l-lg border border-gray-300 px-4 py-2 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              />
              <button className="bg-yellow-500 text-white px-4 py-2 rounded-r-lg hover:bg-yellow-600 transition">
                Search
              </button>
            </form>

            <nav>
              <ul className="flex flex-col space-y-3 text-gray-700 font-medium">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/profile">Profile</Link>
                </li>
                {user ? (
                  <li>
                    <UserDropdown user={user} signOut={signOut} />
                  </li>
                ) : (
                  <li>
                    <Link
                      href="/authPage"
                      className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition block text-center"
                    >
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
