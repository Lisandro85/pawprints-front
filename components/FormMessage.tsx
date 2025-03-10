import React from "react";

interface MessageProps {
  receiver: string;
  sender: string;
  message: string;
  subject: string;
  date: string;
  type: "sent" | "received";
}

const FormMessage = (props: MessageProps) => {
  const formattedDate = props.date
    ? new Date(props.date).toLocaleDateString()
    : "";

  return (
    <div>
      <div className="m-2 p-4 border border-gray-800 rounded-lg shadow-2xl">
        {props.type === "sent" ? (
          <h1 className="font-semibold text-lg">Enviado a: {props.receiver}</h1>
        ) : (
          <h1 className="font-semibold text-lg">Enviado por: {props.sender}</h1>
        )}

        <h2 className="text-sm text-gray-600">Fecha: {formattedDate}</h2>
        <h2 className="text-sm text-gray-600">Asunto: {props.subject}</h2>
        <p className="text-gray-800">Menssage: "{props.message}"</p>

        <div className="flex flex-row justify-end gap-2 mt-4">
          {props.type === "received" && (
            <button className="py-1 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300">
              Responder
            </button>
          )}
          <button className="py-1 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormMessage;
