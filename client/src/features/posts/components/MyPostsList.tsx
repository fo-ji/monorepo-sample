import type { FC } from 'react';
import type { Post } from '@prisma/client';
import { Link, Table } from '@/components/Elements';
import { useMyPosts } from '../api/getMyPosts';

interface MyPostsListProps {
  userId: string;
}

export const MyPostsList: FC<MyPostsListProps> = ({ userId }) => {
  const myPostsQuery = useMyPosts({ userId });

  if (myPostsQuery.data === undefined) return null;

  if (myPostsQuery.data.length === 0) {
    return <div>記事がありません</div>;
  }

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
      ]}
    />
  );
};
