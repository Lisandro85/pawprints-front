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
          title="Logout"
          onClick={() => {
            signOut({
              callbackUrl: "/",
            });
            if (onClick) onClick();
          }}
          className="bg-green-400  px-2 py-1 rounded-lg text-base flex flex-row items-center hover:bg-red-500"
        >
          <CiLogout />
        </button>
      </>
    );
  }
  return (
    <>
      <button
        title="Login"
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
