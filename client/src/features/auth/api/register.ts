import type { User } from '@prisma/client';
import { axios } from '@/lib/axios';

export interface RegisterCredentialsDTO {
  data: {
    name: string;
    email: string;
    password: string;
  };
}

type RegisterFn = (data: RegisterCredentialsDTO) => Promise<User>;

export const useRegister = (): Record<string, RegisterFn> => {
  const register: RegisterFn = async (data) => {
    try {
      alert('success!');

      return await axios.post('/auth/signup', data);
    } catch (error) {
      console.log({ error });

      alert('failed...');
      throw new Error('failed...');
    }
  };

  return { register };
};
