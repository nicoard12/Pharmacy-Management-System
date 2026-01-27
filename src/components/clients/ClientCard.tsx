import { type ClientType } from "../../api/Client";

import { IdentificationIcon } from "@heroicons/react/24/outline";
import ClientContact from "./ClientContact";
import ClientOptions from "./ClientOptions";
import { copyToClipboard, openLink } from "../../api/window";
import ClickTooltip from "../ClickTooltip";
import { useNavigate } from "react-router-dom";

function ClientCard({
  client,
  handleClientDeleted,
  handleClientEdited,
}: {
  client: ClientType;
  handleClientDeleted: (deletedClientId: number) => void;
  handleClientEdited: (client: ClientType) => void;
}) {
  const navigate = useNavigate();

  const goToPrescriptions = () => {
    copyAffiliateNumber();
    openLink("https://www.imed.com.ar/AutorizadorWeb/Beneficiario/Login");
    setTimeout(() => {
      navigate("/prescriptions"); 
    }, 300);  //para que se vea el tooltip
  };

  const copyAffiliateNumber = () => {
    copyToClipboard(client.affiliateNumber);
  };

  return (
    <div className="flex flex-col gap-3 bg-[var(--card)] text-[var(--text-card)] border border-[var(--card-border)] p-4 py-2 pb-3 rounded-xl shadow-sm hover:border-blue-400/50 ">
      <div className="flex flex-col">
        <div className="flex justify-between items-center gap-2">
          <h2 className="text-lg font-medium uppercase">{client.name}</h2>
          <ClientOptions
            client={client}
            handleClientDeleted={handleClientDeleted}
            refreshClient={handleClientEdited}
          />
        </div>

        <div className="flex items-center gap-1 text-sm font-bold text-[var(--text-card)] tracking-wider">
          <IdentificationIcon className="w-4 h-4" />
          <ClickTooltip onClick={copyAffiliateNumber} content="Copiado">
            <span title="Click para copiar" className="cursor-pointer">
              {client.affiliateNumber}
            </span>
          </ClickTooltip>
        </div>
        <hr className="opacity-10 my-1" />

        {client.personInCharge && (
          <div>
            <p className="text-xs tracking-wider opacity-60 font-semibold">
              Responsable
            </p>
            <p className="text-sm font-medium uppercase">
              {client.personInCharge}
            </p>
          </div>
        )}
      </div>

      <ClickTooltip
        content="N° Afiliado copiado"
        onClick={goToPrescriptions}
        top={true}
      >
        <button className="cursor-pointer rounded-lg text-white bg-[var(--button)] hover:bg-[var(--button-hover)] py-2 font-semibold tracking-wide transition-colors">
          Ver recetas
        </button>
      </ClickTooltip>

      <ClientContact client={client} />
    </div>
  );
}

export default ClientCard;
