import type { AppProps } from 'next/app';
import { AppProvider } from '@/providers/app';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  );
}
