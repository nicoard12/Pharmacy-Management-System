import { type ClientType } from "../../api/Client";

import {
  UserIcon,
  IdentificationIcon,
  UserCircleIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import ClientContact from "./ClientContact";
import ClientOptions from "./ClientOptions";
import { openLink } from "../../api/window";

function ClientCard({ client }: { client: ClientType }) {
  const goToPrescriptions = () => {
    openLink("https://www.imed.com.ar/AutorizadorWeb/Beneficiario/Login");
  };

  return (
    <div className="flex flex-col gap-3 bg-[var(--card)] text-[var(--text-card)] border border-[var(--card-border)] p-4 rounded-xl shadow-sm hover:border-blue-400/50 ">
      <div className="flex justify-between items-center gap-4">
        <h2 className="text-lg font-medium uppercase">{client.name}</h2>

        {client.personInCharge && (
          <span className="text-sm font-medium">
            Responsable:{" "}
            <span className="text-[var(--text-card)]">
              {client.personInCharge}
            </span>
          </span>
        )}

        <div className="flex items-start gap-3">
          <ClientOptions />
        </div>
      </div>

      <div className="flex items-center gap-1 text-[var(--text-card)] font-mono font-bold text-base">
        <IdentificationIcon className="w-5 h-5 opacity-70" />
        <span>{client.affiliateNumber}</span>
      </div>

      <button
        onClick={goToPrescriptions}
        className="cursor-pointer rounded-lg text-white bg-[var(--button)] hover:bg-[var(--button-hover)] py-2 font-semibold tracking-wide transition-colors"
      >
        Ver recetas
      </button>

      <ClientContact client={client} />
    </div>
  );
}

export default ClientCard;
