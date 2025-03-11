"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import FormMessage from "../../../components/FormMessage";
import { useMessages } from "../../../context/Message.context";

const Message = () => {
  const { messages, markAsRead, fetchMessages } = useMessages();
  const [activeTab, setActiveTab] = useState<"sent" | "received">("received");
  const { data: session } = useSession();
  const [idUser, setIdUser] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user?.id) {
      setIdUser(session.user.id);
    }
  }, [session]);

  useEffect(() => {
    if (idUser) {
      fetchMessages(idUser);
    }
  }, [idUser, fetchMessages]);

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
                  onClick={() => markAsRead(message.id)}
                  className={`cursor-pointer rounded-lg border border-black m-2 ${
                    !message.isRead
                      ? "bg-emerald-100 text-black font-bold "
                      : "bg-gray-200 text-gray-400 font-normal"
                  }`}
                >
                  <FormMessage
                    sender={message.sender.name}
                    idSender={message.sender.id}
                    receiver={message.receiver.name}
                    idReceiver={message.receiver.id}
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
                <div
                  key={message.id}
                  className="cursor-pointer rounded-lg border border-black m-2 bg-blue-200 text-black"
                >
                  <FormMessage
                    sender={message.sender.name}
                    idSender={message.sender.id}
                    receiver={message.receiver.name}
                    idReceiver={message.receiver.id}
                    message={message.message}
                    subject={message.subject}
                    date={message.create_At}
                    type="sent"
                  />
                </div>
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
