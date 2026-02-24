import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import PrescriptionHeader from "../components/prescriptions/PrescriptionHeader";
import { useEffect, useState } from "react";
import { download_docx, download_pdf } from "../api/window";
import { ClientType } from "../types";
import { getCurrentDateForFile } from "../utils/date";

function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState("");
  const [client, setClient] = useState<ClientType | null>(null);

  const download_docx_Prescriptions = () => {
    download_docx(
      prescriptions,
      `Recetas ${client?.name || "_"} ${getCurrentDateForFile()}`,
    );
  };
  const download_pdf_Prescriptions = () => {
    download_pdf(
      prescriptions,
      `Recetas ${client?.name || "_"} ${getCurrentDateForFile()}`,
    );
  };

  useEffect(() => {
    const stored = localStorage.getItem("current_client");
    setClient(stored ? JSON.parse(stored) : null);
  }, []);

  return (
    <div className="h-full flex flex-col gap-2 px-2 mt-1">
      <PrescriptionHeader
        prescriptions={prescriptions}
        setPrescriptions={setPrescriptions}
      />
      <div className="relative h-full">
        <button
          className="w-14 flex items-center justify-between gap-1 absolute top-1 right-2 bg-[var(--button)] opacity-40 hover:opacity-90 font-medium text-xs text-white/80 rounded-md p-1.5 cursor-pointer "
          onClick={download_docx_Prescriptions}
        >
          .docx <ArrowDownTrayIcon className="h-3 w-3" />
        </button>
        <button
          className="w-14 flex items-center justify-between gap-1 absolute top-10 right-2 bg-red-900 opacity-40 hover:opacity-90 font-medium text-xs text-white/80 rounded-md p-1.5 cursor-pointer "
          onClick={download_pdf_Prescriptions}
        >
          .pdf <ArrowDownTrayIcon className="h-3 w-3" />
        </button>
        <textarea
          className="
          bg-[var(--card)] text-[var(--card-text)]
          w-full h-full overflow-y-auto p-2
          border-0 outline-none resize-none 
          font-sans rounded
          placeholder:text-[var(--placeholder)]"
          placeholder="Las recetas aparecerán aquí"
          value={prescriptions}
          onChange={(e) => setPrescriptions(e.target.value)}
          spellCheck={false}
        />
      </div>
    </div>
  );
}

export default Prescriptions;
