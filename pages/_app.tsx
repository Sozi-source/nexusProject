import { CartProvider } from "@/context/CartContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Header from "@/components/Header/header";

export default function App({ Component, pageProps }: AppProps) {
  return(
      <CartProvider>
      <Head>
        <link rel="manifest" href="/manifest.json" />
         <meta name="theme-color" content="#f59e0b" />
      </Head>
      <Header/>
       <Component {...pageProps} />
    </CartProvider>
   
  );
}
