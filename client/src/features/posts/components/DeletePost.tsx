import type { FC } from 'react';
import { Button, ConfirmationDialog } from '@/components/Elements';
import { useDeletePost } from '../api/deletePost';

interface DeletePostProps {
  postId: string;
  userId: string;
}

export const DeletePost: FC<DeletePostProps> = ({ postId, userId }) => {
  const deletePostMutation = useDeletePost({ userId });

  return (
    <ConfirmationDialog
      icon="danger"
      title="Delete Post"
      body="削除してもよろしいでしょうか？"
      triggerButton={<Button>削除</Button>}
      confirmButton={
        <Button
          type="button"
          className="bg-red-600"
          onClick={async () => await deletePostMutation.mutateAsync({ postId })}
        >
          削除
        </Button>
      }
    />
  );
};
