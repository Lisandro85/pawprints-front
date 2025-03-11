import { useSession } from "next-auth/react";
import { useState } from "react";
import { TbMessage } from "react-icons/tb";
import { useMessages } from "../context/Message.context";
import Swal from "sweetalert2";

interface PropsCard {
  url: string;
  description: string;
  user: string;
  idUser: string;
  currentUserId: string | null;
}

const CardAnimals = (props: PropsCard) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { data: session } = useSession();
  const { fetchMessages, refreshMessages, messages } = useMessages();

  const handleSendMessage = async () => {
    if (!message.trim() || !subject.trim()) {
      setError("El asunto y el mensaje no pueden estar vacíos.");
      return;
    }

    setLoading(true);
    setError("");

    const payload = {
      senderId: props.currentUserId,
      receiverId: props.idUser,
      message,
      subject,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/message/send`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) throw new Error("No se pudo enviar el mensaje.");

      Swal.fire({
        title: "Mensaje enviado con exito",
        icon: "success",
      });
      console.log("Mensaje enviado con éxito!");
      setMessage("");
      setSubject("");
      setIsOpen(false);

      if (session?.user?.id) {
        fetchMessages(session.user.id);
        refreshMessages();
      }
    } catch (err) {
      setError("Error al enviar el mensaje. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative max-w-xs overflow-hidden rounded-2xl shadow-lg group">
      <img
        src={props.url}
        alt="Image of animal post"
        className="w-60 h-65 rounded-lg object-cover transition-transform transform group-hover:scale-110"
      />
      <div className="absolute bottom-0 inset-x-0 flex items-center justify-center p-4 bg-gradient-to-t from-black/60 to-transparent">
        <div className="flex flex-col">
          <h1 className="text-white font-bold">
            Posted by: <span className="uppercase">{props.user}</span>
          </h1>
          <p className="text-white">{props.description}</p>
          <div>
            {props.idUser !== props.currentUserId && (
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
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold">Enviar mensaje a {props.user}</h2>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <label htmlFor="asunto" className="block font-semibold mt-2">
              Asunto:
            </label>
            <input
              type="text"
              id="asunto"
              className="w-full border border-black rounded-lg p-2"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />

            <label htmlFor="mensaje" className="block font-semibold mt-2">
              Mensaje:
            </label>
            <textarea
              id="mensaje"
              className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
              rows={4}
              placeholder="Escribe tu mensaje..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={handleSendMessage}
                disabled={loading}
                className="py-1 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 disabled:opacity-50"
              >
                {loading ? "Enviando..." : "Enviar"}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="py-1 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-300"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardAnimals;
