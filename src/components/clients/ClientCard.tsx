import { type ClientType } from "../../api/Client";

import {
  UserIcon,
  IdentificationIcon,
  UserCircleIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import ClientContact from "./ClientContact";
import ClientOptions from "./ClientOptions";

function ClientCard({ client }: { client: ClientType }) {
  return (
    <div className="flex flex-col gap-3 bg-[var(--card)] text-[var(--text-card)] border border-[var(--card-border)] p-4 rounded-xl shadow-sm hover:border-blue-400/50 ">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <h2 className="text-lg font-bold uppercase tracking-tight">
            {client.name}
          </h2>

          <div className="flex items-center gap-1 text-[var(--text-card)] font-mono font-bold text-base">
            <IdentificationIcon className="w-5 h-5 opacity-70" />
            <span>{client.affiliateNumber}</span>
          </div>

          {client.personInCharge && (
            <div className="flex items-center gap-1.5 mt-2 text-slate-500 dark:text-slate-400">
              <UserCircleIcon className="w-4 h-4" />
              <span className="text-sm font-medium">
                Resp:{" "}
                <span className="text-[var(--text-card)]">
                  {client.personInCharge}
                </span>
              </span>
            </div>
          )}
        </div>

        <div className="flex items-start gap-3">
          <ClientOptions />
        </div>
      </div>

      <button className="cursor-pointer w-full rounded-lg text-white bg-[var(--button)] hover:bg-[var(--button-hover)] py-2 font-semibold tracking-wide transition-colors">
        Ver recetas
      </button>

      <ClientContact client={client} />
    </div>
  );
}

export default ClientCard;
