import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { Post } from 'prisma/prisma-client';
import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

export const getMyPosts = async ({
  userId,
}: {
  userId: string;
}): Promise<Post[]> => {
  return await axios.get(`/posts/me/${userId}`);
};

type QueryFnType = typeof getMyPosts;

type UseMyPostsOptions = {
  userId: string;
  config?: QueryConfig<QueryFnType>;
};

export const useMyPosts = ({
  userId,
  config,
}: UseMyPostsOptions): UseQueryResult<Post[], unknown> => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['myPosts', userId],
    queryFn: async () => await getMyPosts({ userId }),
    ...config,
  });
};
