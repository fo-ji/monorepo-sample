import { useCallback, useState } from 'react';

interface UseSearchKeywordReturnType {
  keyword: string;
  search: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const useSearchKeyword = (): UseSearchKeywordReturnType => {
  const [keyword, setKeyword] = useState('');

  const search = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  }, []);

  return { keyword, search };
};
