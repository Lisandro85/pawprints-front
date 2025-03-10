"use client";
import { fetchData } from "@/utils/getDataApi";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import FormMessage from "../../../components/FormMessage";

const Message = () => {
  const [data, setData] = useState<any[]>([]);
  const { data: session, status } = useSession();
  const [idUser, setIdUser] = useState<string | null>(null);

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

  const sentMessages = data.filter((message) => message.sender.id === idUser);
  const receivedMessages = data.filter(
    (message) => message.receiver.id === idUser
  );

  return (
    <div>
      <h2>Mensajes Enviados</h2>
      {sentMessages.length > 0 ? (
        sentMessages.map((message) => (
          <FormMessage
            key={message.id}
            sender={message.sender.name}
            receiver={message.receiver.name}
            message={message.message}
            subject={message.subject}
            date={message.create_At}
            type="sent"
          />
        ))
      ) : (
        <p>No tienes mensajes enviados.</p>
      )}

      <h2>Mensajes Recibidos</h2>
      {receivedMessages.length > 0 ? (
        receivedMessages.map((message) => (
          <FormMessage
            key={message.id}
            sender={message.sender.name}
            receiver={message.receiver.name}
            message={message.message}
            subject={message.subject}
            date={message.create_At}
            type="received"
          />
        ))
      ) : (
        <p>No tienes mensajes recibidos.</p>
      )}
    </div>
  );
};

export default Message;
