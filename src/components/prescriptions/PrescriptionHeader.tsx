import {
  ClipboardDocumentListIcon,
  DocumentDuplicateIcon,
  ArrowPathIcon,
} from "@heroicons/react/16/solid";
import Button from "../Button";
import { copyToClipboard, paste } from "../../api/window";
import { formatPrescriptions } from "../../utils/prescriptions";
import { useEffect, useState } from "react";
import {
  ClientType,
  getPrescriptions,
  savePrescriptions,
} from "../../api/client";

function PrescriptionHeader({
  prescriptions,
  setPrescriptions,
}: {
  prescriptions: string;
  setPrescriptions: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [client, setClient] = useState<ClientType | null>(null);

  const handlePaste = async () => {
    setPrescriptions(formatPrescriptions(client, await paste()));
  };

  const handleCopy = () => {
    copyToClipboard(prescriptions);
  };

  const handleClean = () => {
    setPrescriptions("");
  };

  const fetchPrescriptions = async () => {
    const response = await getPrescriptions(client!.id);
    setPrescriptions(response);
  };

  useEffect(() => {
    if (!client || !prescriptions) return;
    savePrescriptions(prescriptions, client.id);
  }, [prescriptions, client]);

  useEffect(() => {
    if (!client) return;
    fetchPrescriptions();
  }, [client]);

  useEffect(() => {
    const stored = localStorage.getItem("current_client");
    setClient(stored ? JSON.parse(stored) : null);
  }, []);

  return (
    <header className="flex items-center justify-between bg-[var(--card)] rounded p-2">
      <div className="flex gap-1.5">
        <Button
          Icon={ClipboardDocumentListIcon}
          text={"Pegar recetas"}
          handleClick={handlePaste}
        />
        <Button
          Icon={DocumentDuplicateIcon}
          text={"Copiar"}
          handleClick={handleCopy}
          toolTip="Copiado"
        />
      </div>
      <Button
        Icon={ArrowPathIcon}
        text={"Limpiar"}
        handleClick={handleClean}
        color="bg-[var(--secondary-button)] hover:bg-[var(--secondary-button-hover)]"
      />
    </header>
  );
}

export default PrescriptionHeader;
