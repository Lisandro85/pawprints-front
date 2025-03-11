"use client";
import { useSession } from "next-auth/react";
import Loader from "../../components/Loadder";

export default function Home() {
  const { status } = useSession();
  return (
    <>
      {status === "loading" && <Loader />}
      <div></div>
    </>
  );
}
