import {
  ClipboardDocumentListIcon,
  DocumentDuplicateIcon,
  ArrowPathIcon,
} from "@heroicons/react/16/solid";
import Button from "../Button";
import { copyToClipboard, paste } from "../../api/window";
import { formatPrescriptions } from "../../utils/prescriptions";

function PrescriptionHeader({
  prescriptions,
  setPrescriptions,
}: {
  prescriptions: string;
  setPrescriptions: React.Dispatch<React.SetStateAction<string>>;
}) {
  const handlePaste = async () => {
    setPrescriptions(
      formatPrescriptions(
        { id: 1, name: "nico", affiliateNumber: "111" },
        await paste(),
      ),
    );
  };

  const handleCopy = () => {
    copyToClipboard(prescriptions);
  };

  const handleClean = () => {
    setPrescriptions("");
  };
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
        color="bg-slate-400 hover:bg-slate-500"
      />
    </header>
  );
}

export default PrescriptionHeader;
