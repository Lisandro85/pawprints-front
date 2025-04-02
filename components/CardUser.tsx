import React from "react";

interface UserProps {
  id: string;
  name: string;
  email: string;
  role: string;
}

const CardUser = (props: UserProps) => {
  return (
    <div className="flex flex-row space-x-2">
      <h1>{props.name}</h1>
      <h2>{props.email}</h2>
      <h3> {props.role}</h3>
    </div>
  );
};

export default CardUser;
