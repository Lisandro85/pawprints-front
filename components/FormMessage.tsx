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
    <div className="border border-black m-2 p-2">
      {props.type === "sent" ? (
        <h1>Enviado a: {props.receiver}</h1>
      ) : (
        <h1>Enviado por: {props.sender}</h1>
      )}
      <h2>Fecha: {formattedDate}</h2>
      <h2>Asunto: {props.subject}</h2>
      <p>{props.message}</p>
    </div>
  );
};

export default FormMessage;
