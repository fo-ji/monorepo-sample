import type { User } from '@prisma/client';
import { axios } from '@/lib/axios';

export interface RegisterCredentialsDTO {
  name: string;
  email: string;
  password: string;
}

type RegisterFn = (data: RegisterCredentialsDTO) => Promise<User>;

export const useRegister = (): Record<string, RegisterFn> => {
  const register: RegisterFn = async (data) => {
    return await axios.post('/auth/signup', data);
  };

  return { register };
};
