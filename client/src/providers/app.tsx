import { Suspense } from 'react';
import type { FC, PropsWithChildren } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { AuthProvider } from '@/lib/auth';

export const AppProvider: FC<PropsWithChildren> = ({ children }) => (
  <Suspense fallback={<h3>Loading...</h3>}>
    <ErrorBoundary fallback={<h3>Error!!</h3>}>
      <AuthProvider>{children}</AuthProvider>
    </ErrorBoundary>
  </Suspense>
);
