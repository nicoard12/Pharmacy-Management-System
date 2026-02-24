import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { RecallType } from "../../types";
import RecallDate from "./RecallDate";

function RecallHistory({ recalls, clientId }: { recalls?: RecallType[]; clientId: number }) {
  const [showHistory, setShowHistory] = useState(false);

  return (
    <div className="flex flex-col gap-0.5">
      <button
        type="button"
        onClick={() => setShowHistory((v) => !v)}
        className="group flex w-fit items-center gap-1.5 rounded-md py-1
               text-xs text-[var(--placeholder)] select-none
               hover:text-[var(--card-text)] cursor-pointer"
        aria-expanded={showHistory}
      >
        <ChevronDownIcon
          className={`w-4 h-4 transition-transform duration-300 ${
            showHistory ? "rotate-0" : "-rotate-90"
          }`}
        />
        <span className="font-medium">Historial de retiros</span>
      </button>

      {showHistory && (
        <div className="ml-2 rounded-lg border border-black/10 bg-black/5 p-2">
          {recalls?.length ? (
            <div className="flex flex-col gap-1.5">
              {recalls.map((recall) => (
                <RecallDate key={recall.id} recall={recall} clientId={clientId} />
              ))}
            </div>
          ) : (
            <p className="text-xs text-[var(--placeholder)]">
              No hay retiros registrados
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default RecallHistory;
