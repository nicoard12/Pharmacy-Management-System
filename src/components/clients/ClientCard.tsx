import { type ClientType } from "../../api/client";
import {
  ArrowTopRightOnSquareIcon,
  DocumentTextIcon,
  IdentificationIcon,
  CheckCircleIcon,
} from "@heroicons/react/16/solid";
import ClientContact from "./ClientContact";
import ClientOptions from "./ClientOptions";
import { copyToClipboard, openLink } from "../../api/window";
import ClickTooltip from "../ClickTooltip";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import PickupHistory from "./PickupHistory";

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
        navigate(`/prescriptions`);
      }, 300); //para que se vea el tooltip
    } else navigate(`/prescriptions`);
  };

  const recall = () => {

  }

  const copyAffiliateNumber = () => {
    copyToClipboard(client.affiliateNumber);
  };

  return (
    <div className="flex flex-col gap-1 bg-[var(--card)] text-[var(--card-text)] border border-[var(--card-border)] p-4 py-2 pb-3 rounded-xl shadow-sm hover:border-blue-400/50 ">
      <div className="flex flex-col">
        <div className="flex justify-between items-center gap-2">
          <h2 className="text-lg font-medium uppercase">{client.name}</h2>
          <ClientOptions
            client={client}
            handleClientDeleted={handleClientDeleted}
            refreshClient={handleClientEdited}
          />
        </div>

        <div className="flex items-center gap-1 text-sm font-bold text-[var(--card-text)] tracking-wider">
          <IdentificationIcon className="w-4 h-4" />
          <ClickTooltip onClick={copyAffiliateNumber} content="Copiado">
            <span title="Click para copiar" className="cursor-pointer">
              {client.affiliateNumber}
            </span>
          </ClickTooltip>
        </div>
        <hr className="opacity-10 mt-1" />
      </div>

      <ClientContact client={client} />

      <div className="flex items-center justify-center gap-3 sm:gap-8 md:gap-12 mt-1">
        <Button
          Icon={ArrowTopRightOnSquareIcon}
          text="Obtener recetas"
          handleClick={() => goToPrescriptions(true)}
          toolTip="N° Afiliado copiado"
          title="Abre www.imed.com.ar para obtener las recetas"
        />
        <Button
          Icon={DocumentTextIcon}
          text="Ver recetas"
          handleClick={() => goToPrescriptions(false)}
          title={`Ver últimas recetas obtenidas de ${client.name}`}
        />
        <Button
          Icon={CheckCircleIcon}
          text="Retira"
          handleClick={recall}
          color="bg-[var(--secondary-button)] hover:bg-[var(--secondary-button-hover)]"
        />
      </div>

      <PickupHistory />
    </div>
  );
}

export default ClientCard;
