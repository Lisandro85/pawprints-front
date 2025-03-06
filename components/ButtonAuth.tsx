"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function ButtonAuth() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <button
          onClick={() => signOut()}
          className="bg-red-500 px-1 py-2 rounded-lg"
        >
          Logout
        </button>
      </>
    );
  }
  return (
    <>
      <button
        onClick={() => signIn()}
        className="bg-blue-500 px-5 py-1 rounded-lg"
      >
        Login
      </button>
    </>
  );
}
