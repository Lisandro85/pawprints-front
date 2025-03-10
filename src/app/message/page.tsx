"use client";
import { fetchData } from "@/utils/getDataApi";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import FormMessage from "../../../components/FormMessage";

const Message = () => {
  const [data, setData] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"sent" | "received">("received");
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
      <div className="flex border-b-2 border-gray-300">
        <button
          className={`px-4 py-2 ${
            activeTab === "received"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("received")}
        >
          Mensajes Recibidos
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "sent"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("sent")}
        >
          Mensajes Enviados
        </button>
      </div>
      <div className="mt-4">
        {activeTab === "received" ? (
          <div>
            {receivedMessages.length > 0 ? (
              receivedMessages.map((message) => (
                <div key={message.id}>
                  <FormMessage
                    sender={message.sender.name}
                    receiver={message.receiver.name}
                    message={message.message}
                    subject={message.subject}
                    date={message.create_At}
                    type="received"
                  />
                </div>
              ))
            ) : (
              <p>No has recibidos mensajes.</p>
            )}
          </div>
        ) : (
          <div>
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
              <p>No has enviados mensajes</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
