import { useEffect } from 'react';
import type { FC, PropsWithChildren } from 'react';

import { axios } from './axios';

interface AuthDto {
  csrfToken: string;
}

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  useEffect(() => {
    getCsrfToken()
      .then((token) => (axios.defaults.headers.common['XSRF-TOKEN'] = token))
      .catch((error) => console.log(error));
  }, []);

  const getCsrfToken = async (): Promise<string> => {
    const { csrfToken }: AuthDto = await axios.get('/auth/csrf');

    return csrfToken;
  };

  return <>{children}</>;
};
