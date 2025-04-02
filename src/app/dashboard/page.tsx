"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Loader from "../../../components/Loadder";
import CardUser from "../../../components/CardUser";

interface User {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
}

const Dashboard = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [data, setData] = useState<User[]>([]);

  useEffect(() => {
    if (session?.user?.role !== "admin") {
      Swal.fire({
        title: "NO TIENES ACCESO",
        icon: "warning",
      });
      router.push("/");
      return;
    }
  }, [session, status, router]);

  const getUsers = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user?.token}`,
      },
    });
    const data = await res.json();
    setData(data);
    console.log(data);
  };

  return (
    <div>
      {status === "loading" && <Loader />}
      <h1>Dashboard</h1>
      <button onClick={getUsers}>Usuarios</button>
      {data.map((user) => (
        <CardUser
          id={user.id}
          key={user.id}
          name={user.name}
          email={user.email}
          active={user.isActive}
        />
      ))}
    </div>
  );
};
export default Dashboard;
