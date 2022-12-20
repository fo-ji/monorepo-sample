import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { Post } from 'prisma/prisma-client';
import type { Page } from '@/hooks/usePaginate';
import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

export const getPosts = async ({
  take,
  cursorId,
}: Omit<Page, 'id'>): Promise<Post[]> => {
  console.log({ take });
  console.log({ cursorId });

  return await axios.get('/posts', {
    params: {
      take,
      cursorId,
    },
  });
};

type QueryFnType = typeof getPosts;

type UsePostsOptions = {
  page: Page;
  config?: QueryConfig<QueryFnType>;
};

export const usePosts = ({
  page,
  config,
}: UsePostsOptions): UseQueryResult<Post[], unknown> => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['posts', page.id],
    queryFn: async () => await getPosts(page),
    // keepPreviousData: true,
    ...config,
  });
};
