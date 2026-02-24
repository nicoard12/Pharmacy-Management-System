import { useEffect, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { RecallType } from "../../api/recall";

function PickupHistory({ recalls }: { recalls?: RecallType[] }) {
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    if (showHistory) {
      console.log(recalls);
    }
  }, [showHistory]);
  return (
    <div>
      <p
        onClick={() => setShowHistory(!showHistory)}
        className="mt-1 flex items-center cursor-pointer text-xs text-[var(--placeholder)] hover:text-[var(--card-text)]"
      >
        <ChevronDownIcon className="w-3 h-3 inline-block mr-1" />
        Historial de retiros
      </p>
      {showHistory ? (
        recalls && recalls.length > 0 ? (
          recalls?.map((recall) => (
            <p key={recall.id} className="text-xs ml-4 mt-1">
              {recall.date}
            </p>
          ))
        ) : (
          <p className="text-xs ml-4 mt-1">No hay retiros registrados</p>
        )
      ) : null}
    </div>
  );
}

export default PickupHistory;
