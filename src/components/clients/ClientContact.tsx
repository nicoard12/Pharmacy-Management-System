import {
  ChevronDownIcon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/16/solid";
import { useState } from "react";
import { ClientType } from "../../api/Client";
import ClickTooltip from "../ClickTooltip";
import { copyToClipboard } from "../../api/window";

function ClientContact({ client }: { client: ClientType }) {
  const [showContact, setShowContact] = useState(false);

  const copyPhone = () => {
    copyToClipboard(client.phone!);
  };

  const copyEmail = () => {
    copyToClipboard(client.email!);
  };

  if (!client.phone && !client.email) return null;
  return (
    <div>
      <button
        onClick={() => setShowContact(!showContact)}
        className="cursor-pointer flex items-center gap-1 text-xs opacity-60 hover:opacity-100 "
      >
        <ChevronDownIcon
          className={`w-4 h-4 transition-transform ${
            showContact ? "rotate-180" : ""
          }`}
        />
        Datos de contacto
      </button>

      {showContact && (
        <div className="mt-2 flex items-center gap-3">
          {client.phone && (
            <ClickTooltip content="Copiado" onClick={copyPhone}>
              <div className="flex items-center gap-1.5 text-xs font-medium text-[var(--placeholder)]">
                <PhoneIcon className="w-3.5 h-3.5" />
                <span title="Click para copiar" className="cursor-pointer hover:text-[var(--text-card)]">{client.phone}</span>
              </div>
            </ClickTooltip>
          )}

          {client.email && (
            <div className="flex items-center gap-1.5 text-xs font-medium text-[var(--placeholder)]">
              <EnvelopeIcon className="w-3.5 h-3.5" />
              <ClickTooltip content="Copiado" onClick={copyEmail}>
                <span title="Click para copiar" className="cursor-pointer hover:text-[var(--text-card)]">{client.email}</span>
              </ClickTooltip>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ClientContact;
