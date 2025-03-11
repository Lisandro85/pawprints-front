"use client";
import { fetchData } from "@/utils/getDataApi";
import React, { useEffect, useState } from "react";
import CardAnimals from "../../../components/CardAnimals";
import Loader from "../../../components/Loadder";
import { useSession } from "next-auth/react";

const Lost = () => {
  const [data, setData] = useState<any[]>([]);
  const { data: session, status } = useSession();
  const [currentUserId, seturrentUserId] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user.id) {
      const currentUserId = session.user.id;
      seturrentUserId(currentUserId);
    }
  }, [session]);

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
      {status === "loading" && <Loader />}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-2 m-2">
        {data ? (
          data.map((post) => (
            <CardAnimals
              key={post.id}
              user={post.user.name}
              url={post.urlImg}
              description={post.description}
              idUser={post.user.id}
              currentUserId={currentUserId}
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
