import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { Post } from 'prisma/prisma-client';
import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

export const getMyPosts = async ({
  userId,
  keyword,
}: {
  userId: string;
  keyword: string;
}): Promise<Post[]> => {
  return await axios.get(`/posts/me/${userId}`, { params: { keyword } });
};

type QueryFnType = typeof getMyPosts;

type UseMyPostsOptions = {
  userId: string;
  keyword: string;
  config?: QueryConfig<QueryFnType>;
};

export const useMyPosts = ({
  userId,
  keyword,
  config,
}: UseMyPostsOptions): UseQueryResult<Post[], unknown> => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['myPosts', `${userId}-${keyword}`],
    queryFn: async () => await getMyPosts({ userId, keyword }),
    enabled: keyword !== undefined,
    ...config,
  });
};
