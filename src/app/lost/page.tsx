"use client";
import { fetchData } from "@/utils/getDataApi";
import React, { useEffect, useState } from "react";
import CardAnimals from "../../../components/CardAnimals";
import Loader from "../../../components/Loadder";

import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const Lost = () => {
  const [data, setData] = useState<any[]>([]);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (!session) {
      Swal.fire({
        title: "NO TIENES ACCESO",
        icon: "warning",
      });
      router.push("/login");
      return;
    }
  }, [session, status, router]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await fetchData("upload");
        setData(data);
        console.log(data);
      } catch (error) {}
    };
    fetchPost();
  }, []);

  return (
    <div>
      <Loader />
      <div className="flex flex-col sm:flex-row justify-center items-center gap-2 m-2">
        {data ? (
          data.map((post) => (
            <CardAnimals
              key={post.id}
              user={post.user.name}
              url={post.urlImg}
              description={post.description}
            />
          ))
        ) : (
          <p>Cargando...</p>
        )}
      </div>
    </div>
  );
};

export default Lost;
