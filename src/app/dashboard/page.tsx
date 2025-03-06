"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import Swal from "sweetalert2";

const Dashboard = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session?.user?.role !== "admin") {
      Swal.fire({
        title: "NO TIENES ACCESO",
        icon: "warning",
      });
      router.push("/");
    }
  }, [session, status, router]);

  const getCats = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user?.token}`,
      },
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={getCats} className=" bg-blue-500 px-5 py-2 rounded-lg">
        Get Users
      </button>
      <button
        onClick={() => signOut()}
        className="bg-red-500 px-2 py-2 rounded-l-lg"
      >
        Sign out
      </button>
      <pre>
        <code>{JSON.stringify(session, null, 2)}</code>
      </pre>
    </div>
  );
};
export default Dashboard;
