import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useMessages } from "../context/Message.context";
import Swal from "sweetalert2";

interface DeleteMessageButtonProps {
  messageId: string;
  userId: string | null;
  currentUserId: string | null;
  onDeleteSuccess: () => void;
}

const DeleteMessageButton: React.FC<DeleteMessageButtonProps> = ({
  messageId,
  userId,
  currentUserId,
  onDeleteSuccess,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();
  const { fetchMessages, refreshMessages, messages } = useMessages();

  const handleDelete = async () => {
    // Muestra el modal de confirmación de SweetAlert
    const result = await Swal.fire({
      title: "¿Estás seguro de que deseas eliminar este mensaje?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    // Si el usuario confirma la eliminación, continúa con la eliminación
    if (result.isConfirmed) {
      setIsDeleting(true);
      setError(null);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/message/delete`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              messageId,
              userId: currentUserId,
            }),
          }
        );

        const data = await response.json();

        if (response.ok) {
          if (
            data.message === "Mensaje marcado como borrado para este usuario"
          ) {
            alert("El mensaje ha sido marcado como borrado para ti.");
          } else if (data.message === "Mensaje eliminado completamente") {
            alert("El mensaje ha sido completamente eliminado.");
          }
        } else {
          setError(data.message || "Error al eliminar el mensaje.");
        }
      } catch (err) {
        setError("Error al realizar la solicitud.");
      } finally {
        setIsDeleting(false);
        onDeleteSuccess();
        if (session?.user?.id) {
          fetchMessages(session.user.id);
          refreshMessages();
        }

        // Muestra el Swal de éxito al eliminar el mensaje
        Swal.fire({
          title: "Mensaje eliminado correctamente",
          icon: "success",
        });
      }
    } else {
      // Si el usuario cancela la acción, simplemente no hace nada
      console.log("Eliminación cancelada");
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition-all"
    >
      {isDeleting ? "Eliminando..." : "Eliminar Mensaje"}
    </button>
  );
};

export default DeleteMessageButton;
