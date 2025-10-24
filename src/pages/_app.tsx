// src/pages/_app.tsx
import "@/styles/globals.css";
import { Toaster } from "@/components/ui/toaster";
// import AppLayout from "@/components/app-layout";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* <AppLayout> */}
      <Component {...pageProps} />
      <Toaster />
      {/* </AppLayout> */}
    </>
  );
}

