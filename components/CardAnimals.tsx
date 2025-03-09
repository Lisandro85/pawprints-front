import React from "react";
import { TbMessage } from "react-icons/tb";

interface PropsCard {
  url: string;
  description: string;
  user: string;
}

const CardAnimals = (props: PropsCard) => {
  return (
    <div className="relative max-w-xs overflow-hidden rounded-2xl shadow-lg group">
      <img
        src={props.url}
        alt="Image of animal post"
        className="w-60 h-65 rounded-lg object-cover transition-transform transform group-hover:scale-110"
      />
      <div className="absolute bottom-0 inset-x-0 flex items-center justify-center p-4 bg-gradient-to-t from-black/60 to-transparent">
        <div className="felx flex-col">
          <h1 className="text-white font-bold">
            Posted by: <span className="uppercase">{props.user}</span>
          </h1>
          <p className="text-white">{props.description}</p>
          <div>
            <TbMessage color="red" size={30} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardAnimals;
