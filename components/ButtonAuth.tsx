"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function ButtonAuth() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (session) {
    return (
      <>
        Signed in as {session.user?.email} <br />
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => signIn()}
      >
        Sign in
      </button>
    </>
  );
}
