import { Suspense } from 'react';
import type { AppProps } from 'next/app';
import { ErrorBoundary } from 'react-error-boundary';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ErrorBoundary fallback={<h3>Error!!</h3>}>
      <Suspense fallback={<h3>Loading...</h3>}>
        <Component {...pageProps} />
      </Suspense>
    </ErrorBoundary>
  );
}
