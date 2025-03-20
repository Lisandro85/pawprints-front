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
      } catch (error) {
        console.error(error);
      }
    };
    fetchPost();
  }, []);

  return (
    <div>
      {status === "loading" && <Loader />}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 m-2  justify-items-center">
        {data.length > 0 ? (
          data.map((post) => (
            <CardAnimals
              key={post.id}
              postId={post.id}
              user={post.user.name}
              url={post.urlImg}
              description={post.description}
              adress={post.adress}
              idUser={post.user.id}
              currentUserId={currentUserId}
              setData={setData}
              data={data}
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
