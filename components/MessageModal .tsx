import { useSession } from "next-auth/react";
import { useState } from "react";
import Swal from "sweetalert2";
import { useMessages } from "../context/Message.context";

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  senderId: string | null;
  receiverId: string | null;
  receiverName: string;
  onSendMessage: (subject: string, message: string) => void;
}

const MessageModal: React.FC<MessageModalProps> = ({
  isOpen,
  onClose,
  senderId,
  receiverId,
  receiverName,
  onSendMessage,
}) => {
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
      senderId,
      receiverId,
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
        title: "Mensaje enviado con éxito",
        icon: "success",
      });

      setMessage("");
      setSubject("");
      onClose();
      onSendMessage(subject, message);
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold  text-black">
          Enviar mensaje a {receiverName}
        </h2>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <label htmlFor="asunto" className="block font-semibold mt-2 text-black">
          Asunto:
        </label>
        <input
          type="text"
          id="asunto"
          className="w-full border border-black rounded-lg p-2"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <label
          htmlFor="mensaje"
          className="block font-semibold mt-2  text-black"
        >
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
            onClick={onClose}
            className="py-1 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-300"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
