"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import FormMessage from "../../../components/FormMessage";
import { useMessages } from "../../../context/Message.context";

const Message = () => {
  const { messages, markAsRead, fetchMessages } = useMessages(); // Usamos directamente los mensajes del contexto
  const [activeTab, setActiveTab] = useState<"sent" | "received">("received");
  const { data: session } = useSession();
  const [idUser, setIdUser] = useState<string | null>(null);

  // Establecer el id del usuario cuando la sesión esté lista
  useEffect(() => {
    if (session?.user?.id) {
      setIdUser(session.user.id);
    }
  }, [session]);

  // Cargar los mensajes cuando se haya establecido idUser
  useEffect(() => {
    if (idUser) {
      fetchMessages(idUser); // Cargar mensajes al establecer el idUser
    }
  }, [idUser, fetchMessages]);

  // Filtrar los mensajes enviados y recibidos en base al idUser
  const sentMessages = messages.filter(
    (message) => message.sender.id === idUser
  );
  const receivedMessages = messages.filter(
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
                <div
                  key={message.id}
                  onClick={() => markAsRead(message.id)} // Usamos markAsRead del contexto
                  className={`cursor-pointer p-2 rounded-lg ${
                    !message.isRead ? "bg-gray-200 font-bold" : "bg-white"
                  }`}
                >
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
              <p>No has recibido mensajes.</p>
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
              <p>No has enviado mensajes.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
