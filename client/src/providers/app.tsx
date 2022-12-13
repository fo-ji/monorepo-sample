import { Suspense } from 'react';
import type { FC, PropsWithChildren } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorBoundary } from 'react-error-boundary';

import { AuthProvider } from '@/lib/auth';
import { queryClient } from '@/lib/react-query';

export const AppProvider: FC<PropsWithChildren> = ({ children }) => (
  <Suspense fallback={<h3>Loading...</h3>}>
    <ErrorBoundary fallback={<h3>Error!!</h3>}>
      <QueryClientProvider client={queryClient}>
        {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
        <AuthProvider>{children}</AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </Suspense>
);
