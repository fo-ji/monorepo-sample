import type { User } from '@prisma/client';
import { axios } from '@/lib/axios';

export interface LogInCredentialsDTO {
  email: string;
  password: string;
}

type LogInFn = (data: LogInCredentialsDTO) => Promise<User>;

export const useLogIn = (): Record<string, LogInFn> => {
  const logIn: LogInFn = async (data) => {
    return await axios.post('/auth/login', data);
  };

  return { logIn };
};
