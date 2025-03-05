"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function ButtonAuth() {
  const { data: session, status } = useSession();
  console.log("Usuario:", JSON.stringify(session, null, 2));

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (session) {
    return (
      <>
        Signed in as {session.user?.name} <br />
        <button
          onClick={() => signOut()}
          className="bg-red-500 px-2 py-2 rounded-l-lg"
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
        onClick={() => signIn()}
        className="bg-blue-500 px-5 py-2 rounded-l-lg"
      >
        Sign in
      </button>
    </>
  );
}
