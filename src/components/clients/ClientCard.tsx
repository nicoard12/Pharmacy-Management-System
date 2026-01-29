import { type ClientType } from "../../api/client";
import {
  ArrowTopRightOnSquareIcon,
  DocumentTextIcon,
} from "@heroicons/react/16/solid";
import { IdentificationIcon } from "@heroicons/react/24/outline";
import ClientContact from "./ClientContact";
import ClientOptions from "./ClientOptions";
import { copyToClipboard, openLink } from "../../api/window";
import ClickTooltip from "../ClickTooltip";
import { useNavigate } from "react-router-dom";
import Button from "../Button";

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

  const goToPrescriptions = (goToLink: boolean) => {
    copyAffiliateNumber();
    localStorage.setItem("current_client", JSON.stringify(client));
    if (goToLink) {
      openLink("https://www.imed.com.ar/AutorizadorWeb/Beneficiario/Login");
      setTimeout(() => {
        navigate(`/${client.id}/prescriptions`);
      }, 300); //para que se vea el tooltip
    } else navigate(`/${client.id}/prescriptions`);
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
      <div className="flex items-center justify-center gap-2">
        <Button
          Icon={ArrowTopRightOnSquareIcon}
          text="Obtener recetas"
          handleClick={() => goToPrescriptions(true)}
          toolTip="N° Afiliado copiado"
        />
        <Button
          Icon={DocumentTextIcon}
          text="Ver recetas"
          handleClick={() => goToPrescriptions(false)}
        />
      </div>

      <ClientContact client={client} />
    </div>
  );
}

export default ClientCard;
