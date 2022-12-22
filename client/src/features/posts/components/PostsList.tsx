import type { FC } from 'react';
import type { Post } from '@prisma/client';
import { Pagination } from '@/components/Pagination';
import { usePosts } from '../api/getPosts';
import { usePaginate } from '@/hooks/usePaginate';

export const PostsList: FC = () => {
  const { page, toggle } = usePaginate();
  const { data } = usePosts({ page });

  return (
    <>
      {data?.length === 0 ? (
        <div>記事がありません</div>
      ) : (
        <ul className="flex flex-col space-y-3">
          {data?.map((post) => (
            <li key={post.id} className="w-full bg-white p-4 shadow-sm">
              <div>
                <span className="text-xs font-semibold">{post.title}</span>
              </div>
              <div>{post.createdAt.toString()}</div>
              <div>{post.text}</div>
            </li>
          ))}
        </ul>
      )}
      <div className="p-5 text-center">
        {data != null && (
          <Pagination<Post> data={data} page={page} toggle={toggle} />
        )}
      </div>
    </>
  );
};
