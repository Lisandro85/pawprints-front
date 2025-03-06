"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { CiLogin, CiLogout } from "react-icons/ci";

interface ButtonAuthProps {
  onClick?: () => void;
}
export default function ButtonAuth({ onClick }: ButtonAuthProps) {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <button
          onClick={() => {
            signOut();
            if (onClick) onClick();
          }}
          className="bg-red-500 px-2 py-1 rounded-lg text-base flex flex-row items-center gap-2 hover:bg-green-400 "
        >
          <CiLogout />
          Logout
        </button>
      </>
    );
  }
  return (
    <>
      <button
        onClick={() => {
          signIn();
          if (onClick) onClick();
        }}
        className="bg-blue-500 px-2 py-1 rounded-lg text-base flex flex-row items-center gap-2 hover:bg-green-400 "
      >
        <CiLogin />
        Login
      </button>
    </>
  );
}
