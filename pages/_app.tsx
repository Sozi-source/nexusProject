import { CartProvider } from "@/context/CartContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "@/components/Header/header";
import { AuthProvider } from "firebase/auth";

export default function App({ Component, pageProps }: AppProps) {
  return(
      <CartProvider>
      <Header/>
       <Component {...pageProps} />
    </CartProvider>
   
  );
}
