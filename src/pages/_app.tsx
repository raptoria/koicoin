import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Open_Sans } from "@next/font/google";
import { StoreProvider } from "@/ui/store/store";
import "antd/dist/antd.css";
import "@/styles/main.scss";

const opensans = Open_Sans({
  weight: "400",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={opensans.className}>
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
    </main>
  );
}
