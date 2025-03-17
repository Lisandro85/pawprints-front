import { useState } from "react";
import { TbMessage } from "react-icons/tb";
import { SiGooglemaps } from "react-icons/si";
import MessageModal from "./MessageModal ";

interface PropsCard {
  url: string;
  description: string;
  adress: string;
  user: string;
  idUser: string;
  currentUserId: string | null;
}

const CardAnimals = (props: PropsCard) => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUserId, user, idUser, description, url, adress } = props;

  const handleSendMessage = (subject: string, message: string) => {
    console.log("Mensaje enviado:", subject, message);
  };

  return (
    <div className="relative max-w-xs overflow-hidden rounded-2xl shadow-lg group">
      <div className="relative w-60 h-65">
        <img
          src={url}
          alt="Image of animal post"
          className="absolute inset-0 w-full h-full rounded-lg object-cover transition-all duration-300 ease-in-out z-10 group-hover:z-20"
        />

        {idUser !== currentUserId && (
          <div className="absolute top-2 right-2 z-30 bg-black/50 rounded-full p-1">
            <TbMessage
              title="Escribe al Usuario"
              color="#9CDE9F"
              size={30}
              onClick={() => setIsOpen(true)}
              className="cursor-pointer transform hover:scale-110 hover:rotate-12 transition-transform duration-300"
            />
          </div>
        )}
      </div>

      <div className="absolute bottom-0 inset-x-0 flex items-center justify-center p-4 bg-black/50 opacity-0 transition-all duration-300 ease-in-out z-0 group-hover:opacity-100 group-hover:z-20">
        <div className="flex flex-col">
          <h1 className="text-white font-bold">
            Posted by: <span className="uppercase">{user}</span>
          </h1>
          <p className="text-white">{description}</p>
          <p className="text-white flex flex-row items-center gap-2">
            <SiGooglemaps />
            Visto en: {adress}
          </p>
        </div>
      </div>

      <MessageModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        senderId={currentUserId}
        receiverId={idUser}
        receiverName={user}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default CardAnimals;
