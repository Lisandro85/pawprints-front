"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchData } from "@/utils/getDataApi";

type Message = {
  id: string;
  sender: { id: string; name: string };
  receiver: { id: string; name: string };
  subject: string;
  message: string;
  isRead: boolean;
  create_At: string;
  deletedBySender: string;
  deletedByReceiver: string;
};

type MessageContextType = {
  messages: Message[];
  unreadMessages: Message[];
  fetchMessages: (userId: string) => void;
  markAsRead: (messageId: string) => void;
  refreshMessages: () => void;
};

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const useMessages = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessages must be used within a MessageProvider");
  }
  return context;
};

interface MessageProviderProps {
  children: React.ReactNode;
}

export const MessageProvider: React.FC<MessageProviderProps> = ({
  children,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [idUser, setIdUser] = useState<string | null>(null);

  useEffect(() => {
    const getMessages = async () => {
      if (idUser) {
        try {
          const response = await fetchData(`message/user/${idUser}`);
          console.log(response);
          setMessages(response);
        } catch (error) {
          console.error("Error al obtener los mensajes:", error);
        }
      }
    };
    getMessages();
  }, [idUser]);

  const fetchMessages = async (userId: string) => {
    if (idUser !== userId) {
      setIdUser(userId);
    }
  };

  const markAsRead = async (messageId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/message/receiver/${messageId}`,
        {
          method: "PATCH",
        }
      );
      const updatedMessage = await response.json();

      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === messageId ? { ...msg, isRead: true } : msg
        )
      );
    } catch (error) {
      console.error("Error al marcar como leído:", error);
    }
  };

  const refreshMessages = async () => {
    if (idUser) {
      const response = await fetchData(`message/user/${idUser}`);
      setMessages(response);
    }
  };

  const unreadMessages = messages.filter(
    (message) => message.receiver.id === idUser && !message.isRead
  );

  return (
    <MessageContext.Provider
      value={{
        messages,
        unreadMessages,
        fetchMessages,
        markAsRead,
        refreshMessages,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};
