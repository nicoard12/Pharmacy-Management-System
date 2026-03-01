import { PickupType } from "../../types";
import {
  updatePickupDate,
  deletePickup as deletePickupApi,
} from "../../api/pickup";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import ConfirmModal from "../ConfirmModal";
import { formatToDateTimeLocal } from "../../utils/date";
import { useClientsDispatch } from "../../context/ClientsContext";

function PickupDate({
  pickup,
  clientId,
}: {
  pickup: PickupType;
  clientId: number;
}) {
  const [date, setDate] = useState(formatToDateTimeLocal(pickup.date));
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const dispatch = useClientsDispatch();

  const handleCommit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const isoString = new Date(e.target.value).toISOString();
    try {
      await updatePickupDate(pickup.id, isoString);
    } catch (error) {
      console.log("Error al actualizar la fecha del retiro:", error);
    }
    dispatch({
      type: "PICKUP_DATE_UPDATED",
      payload: { clientId, pickupId: pickup.id, date: isoString },
    });
  };

  const deletePickup = async () => {
    setDeleteModalOpen(false);
    try {
      await deletePickupApi(pickup.id);
    } catch (error) {
      console.log("Error al eliminar el retiro:", error);
    }
    dispatch({
      type: "PICKUP_DELETED",
      payload: { clientId, pickupId: pickup.id },
    });
  };

  return (
    <div className="flex items-center gap-1 p-1.5 bg-[var(--card)] rounded-lg shadow-sm border border-[var(--card-border)]">
      <button
        onClick={() => setDeleteModalOpen(true)}
        className="group p-2 rounded-full hover:bg-red-50 transition-colors duration-200 cursor-pointer"
        aria-label="Eliminar fecha"
      >
        <TrashIcon className="w-4.5 h-4.5 text-gray-400 group-hover:text-red-500" />
      </button>
      <input
        type="datetime-local"
        value={date}
        onBlur={handleCommit}
        onChange={(e) => setDate(e.target.value)}
        className="w-full text-sm text-[var(--card-text)] bg-[var(--card-secondary)] border border-[var(--card-border)] rounded-md px-3 py-1.5 
                 outline-none hover:ring-1 hover:ring-blue-500"
      />

      <ConfirmModal
        isOpen={deleteModalOpen}
        variant="danger"
        onCancel={() => setDeleteModalOpen(false)}
        onConfirm={deletePickup}
        title="Confirmar eliminación"
        message="¿Estás seguro que deseas eliminar esta fecha de retiro? Esta acción no se puede deshacer."
      />
    </div>
  );
}
export default PickupDate;
