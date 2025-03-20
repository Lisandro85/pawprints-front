import { SiGooglemaps } from "react-icons/si";
import MessageModal from "./MessageModal ";
import { TbMessage } from "react-icons/tb";
import { useState } from "react";
import { FaTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";

interface PropsCard {
  postId: string;
  url: string;
  description: string;
  adress: string;
  user: string;
  idUser: string;
  currentUserId: string | null;
  setData: React.Dispatch<React.SetStateAction<any[]>>;
  data: any[];
}

const CardAnimals = (props: PropsCard) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    currentUserId,
    user,
    idUser,
    description,
    url,
    adress,
    postId,
    setData,
    data,
  } = props;

  const handleSendMessage = (subject: string, message: string) => {
    console.log("Mensaje enviado:", subject, message);
  };

  const handleDelete = async (postId: string) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/upload/delete/${postId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error al eliminar el recurso");
        }
        setData(data.filter((post) => post.id !== postId));

        Swal.fire("Eliminado", "El recurso ha sido eliminado.", "success");
        console.log("Recurso eliminado correctamente");
      } catch (error) {
        Swal.fire("Error", "Hubo un problema al eliminar.", "error");
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="relative max-w-xs overflow-hidden rounded-2xl shadow-lg group">
      <div className="relative w-60 h-65">
        <img
          src={url}
          alt="Image of animal post"
          className="absolute inset-0 w-full h-full rounded-lg object-cover transition-all duration-300 ease-in-out z-10 group-hover:z-20"
        />

        {idUser !== currentUserId ? (
          <div className="absolute top-2 right-2 z-30 bg-black/50 rounded-full p-2">
            <TbMessage
              title="Escribe al Usuario"
              color="#9CDE9F"
              size={30}
              onClick={() => setIsOpen(true)}
              className="cursor-pointer transform hover:scale-110 hover:rotate-12 transition-transform duration-300"
            />
          </div>
        ) : (
          <div className="absolute top-2 right-2 z-30 bg-black/50 rounded-full p-2">
            <FaTrashCan
              title="Elimina"
              color="red"
              size={30}
              onClick={() => handleDelete(postId)}
              className="cursor-pointer transform hover:scale-110 hover:rotate-12 transition-transform duration-300"
            />
          </div>
        )}
      </div>

      <div className="absolute bottom-0 inset-x-0 flex items-center justify-center p-4 bg-black/50 opacity-0 transition-all duration-300 ease-in-out z-0 group-hover:opacity-100 group-hover:z-20">
        <div className="flex flex-col w-full">
          <h1 className="text-white font-bold">
            Posted by: <span className="uppercase">{user}</span>
          </h1>
          <p className="text-white">{description}</p>
          <p className="text-white flex items-start gap-2 w-full">
            <SiGooglemaps size={20} className="flex-shrink-0 mt-1" />
            <span className="break-words">Visto en: {adress}</span>
          </p>
        </div>
      </div>

      <MessageModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        senderId={currentUserId}
        senderName={user}
        receiverId={idUser}
        receiverName={user}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default CardAnimals;
