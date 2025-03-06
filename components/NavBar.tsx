"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import ButtonAuth from "./ButtonAuth";
import { FaHome } from "react-icons/fa";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoBodySharp } from "react-icons/io5";
import { FiMenu, FiX } from "react-icons/fi";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const pathName = usePathname();
  const { data: session, status } = useSession();

  const router = useRouter();

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
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

      <div className=" gap-4 justify-center flex-1 text-base hidden md:flex">
        <Link
          href={"/"}
          className={` p-1 rounded-lg hover:bg-green-400 flex flex-row items-center gap-2 ${
            pathName === "/" && "bg-amber-300"
          }`}
        >
          Home
          <FaHome />
        </Link>
        <Link
          href={"/about"}
          className={` p-1 rounded-lg hover:bg-green-400 flex flex-row items-center gap-2 ${
            pathName === "/about" && "bg-amber-300"
          }`}
        >
          About
          <IoBodySharp />
        </Link>
        {session?.user.role === "admin" && (
          <Link
            href={"/dashboard"}
            className={` p-1 rounded-lg hover:bg-green-400 flex flex-row items-center gap-2 ${
              pathName === "/dashboard" && "bg-amber-300"
            }`}
          >
            Dashboard
            <AiOutlineDashboard />
          </Link>
        )}
      </div>

      <div className="ml-auto flex-row justify-between text-base hidden">
        <h1 className="p-2">{session?.user.name}</h1>
        <ButtonAuth />
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white text-3xl md:hidden"
      >
        {isOpen ? <FiX /> : <FiMenu />}
      </button>
      {isOpen && (
        <div
          ref={menuRef}
          className="md:hidden absolute top-16 left-0 w-full bg-blue-700 text-white flex flex-col items-center space-y-4 py-4"
        >
          <Link
            href="/"
            className="p-2 rounded-lg w-full text-center hover:bg-green-400"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/about"
            className="p-2 rounded-lg w-full text-center hover:bg-green-400"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          {session?.user.role === "admin" && (
            <Link
              href="/dashboard"
              className="p-2 rounded-lg w-full text-center hover:bg-green-400"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
          )}
          <div className="w-full flex flex-col items-center mt-4">
            {session ? (
              <>
                <h1 className="text-lg">{session.user.name}</h1>
                <ButtonAuth onClick={() => setIsOpen(false)} />
              </>
            ) : (
              <ButtonAuth onClick={() => setIsOpen(false)} />
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
