import { CartProvider } from "@/context/CartContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Header from "@/components/Header/header";
import { Footer } from "@/components/common/Footer";

export default function App({ Component, pageProps }: AppProps) {
  return(
      <CartProvider>
      <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" type="image/png" sizes="192x192" href="/assets/images/icon-192x192.png" />
          <link rel="apple-touch-icon" href="/assets/images/icon-512x512.png" />
          <meta name="theme-color" content="#f59e0b" />
      </Head>

      <Header/>
       <Component {...pageProps} />
       <Footer/>
    </CartProvider>
   
  );
}
