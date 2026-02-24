import { EnvelopeIcon, PhoneIcon, UserIcon } from "@heroicons/react/16/solid";
import { ClientType } from "../../types";
import ClickTooltip from "../ClickTooltip";
import { copyToClipboard } from "../../api/window";

function ClientContact({ client }: { client: ClientType }) {
  const copyPhone = () => {
    copyToClipboard(client.phone!);
  };

  const copyEmail = () => {
    copyToClipboard(client.email!);
  };

  if (!client.phone && !client.email && !client.personInCharge) return null;
  return (
    <div className="flex flex-col">
      {client.personInCharge && (
        <div className="flex items-center gap-1 text-[var(--placeholder)] my-1">
          <UserIcon className="w-3.5 h-3.5" />
          <p className="text-xs font-medium tracking-wide">
            RESPONSABLE:{" "}
            <span className="text-[var(--card-text)] uppercase">
              {client.personInCharge}
            </span>
          </p>
        </div>
      )}
      <div className="flex items-center gap-2 my-1 text-[var(--placeholder)]">
        {client.phone && (
          <ClickTooltip content="Copiado" onClick={copyPhone}>
            <div className="flex items-center gap-1 text-xs font-medium">
              <PhoneIcon className="w-3.5 h-3.5" />
              <span
                title="Click para copiar"
                className="cursor-pointer hover:text-[var(--card-text)]"
              >
                {client.phone}
              </span>
            </div>
          </ClickTooltip>
        )}

        {client.email && (
          <div className="flex items-center gap-1 text-xs font-medium">
            <EnvelopeIcon className="w-3.5 h-3.5" />
            <ClickTooltip content="Copiado" onClick={copyEmail}>
              <span
                title="Click para copiar"
                className="cursor-pointer hover:text-[var(--card-text)]"
              >
                {client.email}
              </span>
            </ClickTooltip>
          </div>
        )}
      </div>
      <hr className="opacity-10 my-1" />
    </div>
  );
}

export default ClientContact;
