import { useCallback, useState } from 'react';

import type { Post } from '@prisma/client';
import type { AxiosRequestConfig } from 'axios';

export interface Page extends AxiosRequestConfig {
  num: number;
  take: number;
  cursorId: string | undefined;
}

export type Model = Post;

export type PageActionType = 'next' | 'prev';

interface UsePagenateReturnType {
  page: Page;
  toggle: (type: PageActionType, data: Model[]) => void;
}

export const usePaginate = (): UsePagenateReturnType => {
  const [page, setPage] = useState<Page>({
    num: 0,
    take: 3,
    cursorId: undefined,
  });

  // TODO: useReducerを利用しても良いかもしれない
  const toggle = useCallback((type: PageActionType, data: Model[]) => {
    switch (type) {
      case 'next':
        setPage((prevState) => ({
          num: prevState.num + 1,
          take: Math.abs(prevState.take),
          cursorId: data.at(-1)?.id,
        }));
        break;
      case 'prev':
        setPage((prevState) => ({
          num: prevState.num - 1,
          take: -Math.abs(prevState.take),
          cursorId: data.at(0)?.id,
        }));
        break;
      default: {
        const _: never = type;
        break;
      }
    }
  }, []);

  return { page, toggle };
};
