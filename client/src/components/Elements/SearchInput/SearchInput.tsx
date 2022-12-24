import type { FC } from 'react';

interface SearchInputProps {
  keyword: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchInput: FC<SearchInputProps> = ({ keyword, onChange }) => (
  <>
    <label
      htmlFor="search"
      className="mb-2 block text-sm font-medium text-gray-900"
    >
      検索
    </label>
    <input
      type="text"
      id="search"
      className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
      value={keyword}
      onChange={onChange}
    />
  </>
);
