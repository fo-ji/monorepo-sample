import { User } from '@prisma/client';
import { axios } from '@/lib/axios';

export const getLogInUser = async (): Promise<User | undefined> => {
  return await axios.get('/auth/me');
};
