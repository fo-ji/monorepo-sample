import type { NextPage } from 'next';
import { Link } from '@/components/Elements/Link';

const Home: NextPage = () => (
  <div className="p-10">
    <h1 className="text-center text-gray-800">Home</h1>
    <div className="flex justify-end gap-8">
      <Link href="/signup">SignUp</Link>
      <Link href="/login">LogIn</Link>
    </div>
  </div>
);

export default Home;
