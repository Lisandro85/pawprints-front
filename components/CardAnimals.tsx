import { useState } from "react";
import { TbMessage } from "react-icons/tb";
import MessageModal from "./MessageModal ";

interface PropsCard {
  url: string;
  description: string;
  user: string;
  idUser: string;
  currentUserId: string | null;
}

const CardAnimals = (props: PropsCard) => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUserId, user, idUser, description, url } = props;

  const handleSendMessage = (subject: string, message: string) => {
    console.log("Mensaje enviado:", subject, message);
  };

  return (
    <div className="relative max-w-xs overflow-hidden rounded-2xl shadow-lg group">
      <img
        src={url}
        alt="Image of animal post"
        className="w-60 h-65 rounded-lg object-cover transition-transform transform group-hover:scale-110"
      />
      <div className="absolute bottom-0 inset-x-0 flex items-center justify-center p-4 bg-gradient-to-t from-black/60 to-transparent">
        <div className="flex flex-col">
          <h1 className="text-white font-bold">
            Posted by: <span className="uppercase">{user}</span>
          </h1>
          <p className="text-white">{description}</p>
          <div>
            {idUser !== currentUserId && (
              <TbMessage
                color="red"
                size={30}
                onClick={() => setIsOpen(true)}
                className="cursor-pointer transform hover:scale-110 hover:rotate-12 transition-transform duration-300"
              />
            )}
          </div>
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
