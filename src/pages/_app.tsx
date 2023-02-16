import type { AppProps } from 'next/app';
import { Open_Sans } from '@next/font/google';
import { StoreProvider } from '@/ui/store/store';
import GlobalStyle from '@/styles/global';
import 'antd/dist/antd.css';

const opensans = Open_Sans({
  weight: '400',
  subsets: ['latin'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={opensans.className}>
      <GlobalStyle />
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
    </main>
  );
}
