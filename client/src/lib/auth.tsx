import { useEffect, useState } from 'react';
import type { FC, PropsWithChildren } from 'react';

import { User } from '@prisma/client';
import { useRouter } from 'next/router';
import { axios } from './axios';
import { getLogInUser } from '@/features/auth/api/getLogInUser';

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

export const AuthGuard: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    getLogInUser()
      .then(async (user) => {
        if (user === undefined) {
          await router.replace('/');
        }
      })
      .catch((error) => console.log(error));
  }, [router]);

  return <>{children}</>;
};

export const useAuth = (): Record<string, User | undefined> => {
  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    getLogInUser()
      .then((user) => setUser(user))
      .catch((error) => console.log(error));
  }, []);

  return { user };
};
