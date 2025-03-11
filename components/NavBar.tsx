"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useRef, useState, useEffect } from "react";
import { FaHome, FaUserAlt, FaUserAltSlash } from "react-icons/fa";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoBodySharp } from "react-icons/io5";
import { FiMenu, FiX } from "react-icons/fi";
import { MdFormatAlignLeft, MdMessage } from "react-icons/md";
import { SiDatadog } from "react-icons/si";
import { BsSearchHeart } from "react-icons/bs";
import { useMessages } from "../context/Message.context";
import ButtonAuth from "./ButtonAuth";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();
  const { data: session, status } = useSession();
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);
  const { unreadMessages } = useMessages();

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
    <nav className="flex flex-row p-1 justify-between items-center text-3xl bg-blue-600 mb-5">
      <div className="flex items-center justify-center">
        <Image
          src={"/logo.jpg"}
          alt="Pawprints logo"
          width={40}
          height={40}
          className="rounded-full cursor-pointer"
          priority
          onClick={() => router.push("/")}
        />
      </div>

      <div className="gap-4 justify-center flex-1 text-base hidden md:flex">
        <Link
          href={"/"}
          className={`p-1 rounded-lg hover:bg-green-400 flex flex-row items-center gap-2 ${
            pathName === "/" && "bg-emerald-400/60"
          }`}
        >
          Home <FaHome />
        </Link>

        <Link
          href={"/about"}
          className={`p-1 rounded-lg hover:bg-green-400 flex flex-row items-center gap-2 ${
            pathName === "/about" && "bg-emerald-400/60"
          }`}
        >
          About <IoBodySharp />
        </Link>
        <Link
          href={"/register"}
          className={`p-1 rounded-lg hover:bg-green-400 flex flex-row items-center gap-2 ${
            pathName === "/register" && "bg-emerald-400/60"
          }`}
        >
          Register <MdFormatAlignLeft />
        </Link>

        {session && (
          <Link
            href={"/post"}
            className={`p-1 rounded-lg hover:bg-green-400 flex flex-row items-center gap-2 ${
              pathName === "/post" && "bg-emerald-400/60"
            }`}
          >
            Post Animal <SiDatadog />
          </Link>
        )}

        {session && (
          <Link
            href={"/lost"}
            className={`p-1 rounded-lg hover:bg-green-400 flex flex-row items-center gap-2 ${
              pathName === "/lost" && "bg-emerald-400/60"
            }`}
          >
            Found Animals <BsSearchHeart />
          </Link>
        )}

        {session?.user.role === "admin" && (
          <Link
            href={"/dashboard"}
            className={`p-1 rounded-lg hover:bg-green-400 flex flex-row items-center gap-2 ${
              pathName === "/dashboard" && "bg-emerald-400/60"
            }`}
          >
            Dashboard <AiOutlineDashboard />
          </Link>
        )}
      </div>

      <div className="ml-auto flex-row justify-between text-base hidden md:flex items-center">
        {session && (
          <h1 className="p-2 flex flex-row items-center gap-2">
            <MdMessage
              onClick={() => router.push("/message")}
              className="transform hover:scale-110 hover:rotate-12 transition-transform duration-300"
              size={25}
            />{" "}
            {unreadMessages.length > 0
              ? `Tienes ${unreadMessages.length} mensajes sin leer`
              : "Sin nuevos mensajes"}{" "}
          </h1>
        )}

        <h1 className="p-2 flex flex-row items-center gap-2">
          {session ? (
            <>
              <FaUserAlt />
            </>
          ) : (
            <FaUserAltSlash />
          )}
          {session?.user.name}
          <ButtonAuth />
        </h1>
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
          className="md:hidden absolute top-16 left-0 w-full bg-blue-700 text-white flex flex-col items-center space-y-4 py-4 z-50"
        >
          <Link
            href="/"
            className="p-2 rounded-lg w-full text-center hover:bg-green-400 flex flex-row items-center gap-1 justify-center"
            onClick={() => setIsOpen(false)}
          >
            Home <FaHome />
          </Link>

          <Link
            href="/about"
            className="p-2 rounded-lg w-full text-center hover:bg-green-400 flex flex-row items-center gap-1 justify-center"
            onClick={() => setIsOpen(false)}
          >
            About <IoBodySharp />
          </Link>

          {!session && (
            <Link
              href="/register"
              className="p-2 rounded-lg w-full text-center hover:bg-green-400 flex flex-row items-center gap-1 justify-center"
              onClick={() => setIsOpen(false)}
            >
              Registrarse <MdFormatAlignLeft />
            </Link>
          )}

          {session && (
            <Link
              href="/post"
              className="p-2 rounded-lg w-full text-center hover:bg-green-400 flex flex-row items-center gap-1 justify-center"
              onClick={() => setIsOpen(false)}
            >
              Post Animal <SiDatadog />
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
