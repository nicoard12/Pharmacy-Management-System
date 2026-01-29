import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import PrescriptionHeader from "../components/prescriptions/PrescriptionHeader";
import { useState } from "react";
import { download_docx, download_pdf } from "../api/window";

function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState("");

  const download_docx_Presicriptions = () => {
    download_docx(prescriptions, "Recetas tal cliente");
  };
  const download_pdf_Presicriptions = () => {
    download_pdf(prescriptions, "Recetas tal cliente");
  };

  return (
    <div className="h-full flex flex-col gap-2 px-2 mt-1">
      <PrescriptionHeader
        prescriptions={prescriptions}
        setPrescriptions={setPrescriptions}
      />
      <div className="relative h-full">
        <button
          className="w-14 flex items-center justify-between gap-1 absolute top-1 right-2 bg-[var(--button)] opacity-40 hover:opacity-90 font-medium text-xs text-white/80 rounded-md p-1.5 cursor-pointer "
          onClick={download_docx_Presicriptions}
        >
          .docx <ArrowDownTrayIcon className="h-3 w-3" />
        </button>
        <button
          className="w-14 flex items-center justify-between gap-1 absolute top-10 right-2 bg-red-900 opacity-40 hover:opacity-90 font-medium text-xs text-white/80 rounded-md p-1.5 cursor-pointer "
          onClick={download_pdf_Presicriptions}
        >
          .pdf <ArrowDownTrayIcon className="h-3 w-3" />
        </button>
        <textarea
          className="
          bg-[var(--card)] text-[var(--text-card)]
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
