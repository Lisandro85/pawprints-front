import React from "react";

interface UserProps {
  id: string;
  name: string;
  email: string;
  active: boolean;
}

const CardUser = (props: UserProps) => {
  return (
    <div
      className={`flex flex-row space-x-2 ${
        props.active ? "text-blue-500" : "text-red-500"
      }`}
    >
      <h1>{props.name}</h1>
      <h2>{props.email}</h2>
      <h3>{props.active ? "Activo" : "Inactivo"}</h3>
    </div>
  );
};

export default CardUser;
