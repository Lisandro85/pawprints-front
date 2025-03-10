import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { fetchData } from "./getDataApi";

export const getCountMessages = async () => {
  const { data: session, status } = useSession();
  const [idUser, setIdUser] = useState<string | null>(null);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    if (session?.user?.id) {
      setIdUser(session.user.id);
    }
  }, [session]);

  useEffect(() => {
    if (idUser) {
      const getMessages = async () => {
        try {
          const response = await fetchData(`message/user/${idUser}`);
          setData(response);
        } catch (error) {
          console.error("Error al obtener los mensajes:", error);
        }
      };
      getMessages();
    }
  }, [idUser]);
};
