import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { Post } from 'prisma/prisma-client';
import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

export const getPosts = async (): Promise<Post[]> => {
  return await axios.get('/posts');
};

type QueryFnType = typeof getPosts;

type UsePostsOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const usePosts = ({ config }: UsePostsOptions = {}): UseQueryResult<
  Post[],
  unknown
> => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['posts'],
    queryFn: async () => await getPosts(),
    ...config,
  });
};
