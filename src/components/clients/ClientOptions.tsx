import {
  EllipsisVerticalIcon,
  TrashIcon,
  PencilSquareIcon,
} from "@heroicons/react/16/solid";
import { useEffect, useRef, useState } from "react";
import { ClientType, deleteClient } from "../../api/Client";
import { getCleanErrorMessage } from "../../utils/error";
import { toast } from "react-hot-toast";
import ConfirmModal from "../ConfirmModal";
import { AddClient } from "./AddClient";

function ClientOptions({
  client,
  handleClientDeleted,
  refreshClient,
}: {
  client: ClientType;
  handleClientDeleted: (deletedClientId: number) => void;
  refreshClient: (updatedClient: ClientType) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const onDelete = () => {
    setOpenDeleteConfirm(true);
    setIsOpen(false);
  };

  const onEdit = () => {
    setOpenEditModal(true);
    setIsOpen(false);
  };

  const confirmDelete = async () => {
    try {
      await deleteClient(client.id);
      handleClientDeleted(client.id);
      toast.success("Cliente eliminado con éxito");
    } catch (error) {
      toast.error(
        `Error: ${getCleanErrorMessage(error) || "No se pudo eliminar el cliente"}`,
      );
    } finally {
      setOpenDeleteConfirm(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        optionsRef.current &&
        event.target instanceof Node &&
        !optionsRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={optionsRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800"
      >
        <EllipsisVerticalIcon className="w-5 h-5 opacity-70" />
      </button>

      {isOpen && (
        <div className="absolute right-0 rounded bg-[var(--card)] shadow-lg border border-[var(--card-border)] text-sm z-10 font-medium">
          <button
            onClick={onEdit}
            className="flex items-center gap-1 cursor-pointer w-full pl-2 px-5 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <PencilSquareIcon className="w-4 h-4 " />
            Editar
          </button>
          <button
            onClick={onDelete}
            className="flex items-center gap-1 cursor-pointer w-full pl-2 px-5 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <TrashIcon className="w-4 h-4 " />
            Eliminar
          </button>
        </div>
      )}
      <ConfirmModal
        isOpen={openDeleteConfirm}
        title="Confirmar eliminación"
        message={`¿Estás seguro que deseas eliminar al cliente "${client.name}"? Esta acción no se puede deshacer.`}
        onConfirm={confirmDelete}
        onCancel={() => setOpenDeleteConfirm(false)}
        variant="danger"
      />

      {openEditModal && (
        <AddClient
          close={() => setOpenEditModal(false)}
          refreshClients={refreshClient}
          client={client}
        />
      )}
    </div>
  );
}

export default ClientOptions;
