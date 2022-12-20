import { useCallback, useState } from 'react';

import { Post } from '@prisma/client';
import type { AxiosRequestConfig } from 'axios';

import { nanoid } from 'nanoid';

export type Page = {
  id: string;
  take: number;
  cursorId: string;
} & AxiosRequestConfig;

export type Models = Post[];

interface UsePagenateReturnType {
  page: Page;
  // FIXME: dataを動的に設定したい
  setNextPage: (data: Models) => void;
  setPrevPage: (data: Models) => void;
}

export const usePaginate = (): UsePagenateReturnType => {
  const [page, setPage] = useState({
    id: nanoid(),
    take: 10,
    cursorId: '',
  });

  // TODO: 関数をまとめても良いかもしれない
  // TODO: マイナスはサーバー側でparseIntPipeすると整数に戻るっぽいので、仕組み変えた方が良さそう

  const setNextPage = useCallback(
    (data: Models) =>
      setPage((prevState) => ({
        id: nanoid(),
        take: Math.abs(prevState.take),
        cursorId: data.at(-1)?.id ?? '',
      })),
    []
  );

  const setPrevPage = useCallback(
    (data: Models) =>
      setPage((prevState) => ({
        id: nanoid(),
        take: -Math.abs(prevState.take),
        cursorId: data.at(-1)?.id ?? '',
      })),
    []
  );

  return { page, setNextPage, setPrevPage };
};
