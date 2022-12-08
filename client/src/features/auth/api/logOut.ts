import { axios } from '@/lib/axios';

type LogOutFn = () => Promise<void>;

export const useLogOut = (): Record<string, LogOutFn> => {
  const logOut: LogOutFn = async () => {
    return await axios.post('/auth/logout');
  };

  return { logOut };
};
