import {
  ChevronDownIcon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/16/solid";
import { useState } from "react";
import { ClientType } from "../../api/Client";

function ClientContact({ client }: { client: ClientType }) {
  const [showContact, setShowContact] = useState(false);

  if (!client.phone && !client.email) return null;
  return (
    <div>
      <button
        onClick={() => setShowContact(!showContact)}
        className="cursor-pointer flex items-center gap-1 text-xs opacity-60 hover:opacity-100 transition"
      >
        <ChevronDownIcon
          className={`w-4 h-4 transition-transform ${
            showContact ? "rotate-180" : ""
          }`}
        />
        Datos de contacto
      </button>

      {showContact && (
        <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2">
          {client.phone && (
            <div className="flex items-center gap-1.5 text-xs font-medium opacity-70">
              <PhoneIcon className="w-3.5 h-3.5" />
              <span>{client.phone}</span>
            </div>
          )}

          {client.email && (
            <div className="flex items-center gap-1.5 text-xs font-medium opacity-70">
              <EnvelopeIcon className="w-3.5 h-3.5" />
              <span className="truncate max-w-[180px]">{client.email}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ClientContact;
