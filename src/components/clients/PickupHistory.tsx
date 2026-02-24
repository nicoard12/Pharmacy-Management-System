import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

function PickupHistory() {
  const [showHistory, setShowHistory] = useState(false);
  return (
    <div>
      <p
        onClick={() => setShowHistory(!showHistory)}
        className="mt-1 flex items-center cursor-pointer text-xs text-[var(--placeholder)] hover:text-[var(--card-text)]"
      >
        <ChevronDownIcon className="w-3 h-3 inline-block mr-1" />
        Historial de retiros
      </p>
      {showHistory && <p>CHau</p>}
    </div>
  );
}

export default PickupHistory;
