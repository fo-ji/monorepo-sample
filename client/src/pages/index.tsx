import type { NextPage } from 'next';
import { Button, Link } from '@/components/Elements';
import { useLogOut } from '@/features/auth/api/logOut';
import { PostsList } from '@/features/posts/components';

const Home: NextPage = () => {
  const { logOut } = useLogOut(); // for test

  return (
    <div className="p-10">
      <h1 className="text-center text-gray-800">Home</h1>
      <div className="flex justify-end gap-8">
        <Link href="/signup">SignUp</Link>
        <Link href="/login">LogIn</Link>
        <Button // for test
          onClick={async () => {
            await logOut();
          }}
        >
          refresh
        </Button>
      </div>
      <PostsList />
    </div>
  );
};

export default Home;
