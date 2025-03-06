"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import ButtonAuth from "./ButtonAuth";

const NavBar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  return (
    <nav className="flex flex-row p-1 justify-between items-center text-3xl bg-blue-600">
      <div className="flex items-center justify-center">
        <Image
          src={"/logo.jpg"}
          alt="Pawprints logo"
          width={40}
          height={40}
          className="rounded-full"
          onClick={() => router.push("/")}
        />
      </div>

      <div className="flex gap-4 justify-center flex-1 text-base">
        <Link href={"/"} className=" p-1 rounded-lg hover:bg-green-400">
          Home
        </Link>
        {session && (
          <Link
            href={"/dashboard"}
            className="p-1 rounded-lg hover:bg-green-400"
          >
            Dashboard
          </Link>
        )}
      </div>

      <div className="ml-auto flex flex-row justify-between text-base">
        <h1 className="p-2">{session?.user.name}</h1>
        <ButtonAuth />
      </div>
    </nav>
  );
};

export default NavBar;
