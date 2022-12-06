import type { NextPage } from 'next';
import { Link } from '@/components/Elements/Link';

import { LogInForm } from '@/features/auth/components';

// TODO: ログイン実装
const LogIn: NextPage = () => (
  <div className="p-10">
    <h1 className="text-center text-gray-800">LogIn</h1>
    <Link href="/">Back</Link>
    <LogInForm />
  </div>
);

export default LogIn;
