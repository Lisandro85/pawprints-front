import React, { useState } from "react";
import MessageModal from "./MessageModal ";
import DeleteMessageButton from "./DeleteMessageButton";

interface MessageProps {
  currentIdUser: string | null;
  messageId: string;
  idSender: string | null;
  idReceiver: string | null;
  receiver: string;
  sender: string;
  message: string;
  subject: string;
  date: string;
  type: "sent" | "received";
}

const FormMessage = (props: MessageProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const formattedDate = props.date
    ? new Date(props.date).toLocaleDateString()
    : "";

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const handleDeleteSuccess = () => {
    console.log("cerrando modal");
    setIsOpen(false);
  };

  return (
    <div>
      <div
        className="flex flex-row justify-between items-center p-2"
        onClick={() => setIsOpen(true)}
      >
        <h1>
          {props.type === "sent"
            ? `Enviado a: ${props.receiver}`
            : `Enviado por: ${props.sender}`}
        </h1>
        <h2>Asunto: {props.subject}</h2>
        <h2>Fecha: {formattedDate}</h2>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-2 rounded-lg shadow-lg w-96">
            <p className="text-gray-800 mt-4">Mensaje: "{props.message}"</p>
            <div className="flex justify-end gap-2 mt-4">
              {props.type === "received" && (
                <button
                  className="py-1 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300"
                  onClick={openModal}
                >
                  Responder
                </button>
              )}

              <DeleteMessageButton
                messageId={props.messageId}
                userId={props.currentIdUser}
                currentUserId={props.currentIdUser}
                onDeleteSuccess={handleDeleteSuccess}
              />

              <button
                onClick={() => setIsOpen(false)}
                className="py-1 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-300"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      <MessageModal
        isOpen={isOpenModal}
        onClose={closeModal}
        senderId={props.idReceiver}
        receiverId={props.idSender}
        receiverName={props.receiver}
        senderName={props.sender}
        onSendMessage={() => {
          setIsOpen(false);
          closeModal();
        }}
      />
    </div>
  );
};

export default FormMessage;
