import {
  ClipboardDocumentListIcon,
  DocumentDuplicateIcon,
  PhoneIcon,
} from "@heroicons/react/16/solid";
import Button from "../Button";
import { copyToClipboard, openLink, paste } from "../../api/window";
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

  const sendWhatsapp = () => {
    const message = encodeURIComponent(prescriptions);
    openLink(`https://wa.me/${client!.phone}?text=${message}`);
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
    <header className="flex items-center gap-2 bg-[var(--card)] rounded p-2">

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
        {client?.phone && (
          <Button
            Icon={PhoneIcon}
            text="Enviar por Whatsapp"
            handleClick={sendWhatsapp}
            color="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-500"
          />
        )}

    </header>
  );
}

export default PrescriptionHeader;
