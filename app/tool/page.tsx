import { getServerSession } from 'next-auth';
import authConfig from 'lib/auth';
import { redirect } from 'next/navigation';

export default async function ToolPage() {
  const session = await getServerSession(authConfig);

  if (!session?.user) {
    redirect('/auth/login');
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Tool Dashboard</h1>
      <p className="text-lg text-gray-700">
        Logged in as:{' '}
        <span className="font-mono">{session?.user?.email ?? 'Unknown'}</span>
      </p>
    </div>
  );
}