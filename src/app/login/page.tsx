"use client"
import { useSession, signIn, signOut } from 'next-auth/react';

export default function LoginPage() {
  const { data: session } = useSession();

  const handleSignButtonClick = () => {
    if (session) {
      signOut();
    } else {
      signIn();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold mb-4">Login Page</h1>
        {session?.user ? (
          <>
            <p className="mb-2">Welcome, {session.user.name}!</p>
            <button
              onClick={handleSignButtonClick}
              className="px-4 py-2 bg-red-500 text-white rounded-lg"
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <p className="mb-2">Please sign in to continue.</p>
            <button
              onClick={handleSignButtonClick}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Sign In
            </button>
          </>
        )}
      </div>
    </div>
  );
}
