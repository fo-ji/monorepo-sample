import type { FC } from 'react';
import type { Post } from '@prisma/client';
import { Link, Table } from '@/components/Elements';
import { useMyPosts } from '../api/getMyPosts';
import { DeletePost } from './DeletePost';

interface MyPostsListProps {
  userId: string;
  keyword: string;
}

export const MyPostsList: FC<MyPostsListProps> = ({ userId, keyword }) => {
  const myPostsQuery = useMyPosts({ userId, keyword });

  if (myPostsQuery.data === undefined) return null;

  return (
    <Table<Post>
      data={myPostsQuery.data ?? []}
      columns={[
        {
          title: '',
          field: 'id',
          Cell({ entry: { id } }) {
            // TODO: ./${userId}/posts/xxxxx
            return <Link href={`./${userId}/${id}`}>Edit</Link>;
          },
        },
        { title: 'Title', field: 'title' },
        { title: 'Created_At', field: 'createdAt' },
        {
          title: '',
          field: 'id',
          Cell({ entry: { id } }) {
            // TODO: ./${userId}/posts/xxxxx
            return <DeletePost postId={id} userId={userId} />;
          },
        },
      ]}
    />
  );
};
