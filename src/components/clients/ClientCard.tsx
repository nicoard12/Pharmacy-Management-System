import { type ClientType } from "../../types";
import {
  ArrowTopRightOnSquareIcon,
  DocumentTextIcon,
  IdentificationIcon,
  CheckCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/16/solid";
import ClientContact from "./ClientContact";
import ClientOptions from "./ClientOptions";
import { copyToClipboard, openLink } from "../../api/window";
import ClickTooltip from "../ClickTooltip";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import PickupHistory from "./PickupHistory";
import { createPickup } from "../../api/pickup";
import { getCleanErrorMessage } from "../../utils/error";
import toast from "react-hot-toast";
import { useClientsDispatch } from "../../context/ClientsContext";
import { useMemo, useState } from "react";
import { isOldDate } from "../../utils/date";

//TODO: Eliminar fecha retiro luego de 60 dias

function ClientCard({ client }: { client: ClientType }) {
  const navigate = useNavigate();
  const dispatch = useClientsDispatch();
  const [showHistory, setShowHistory] = useState(false);

  const isIlluminated = useMemo(() => {
    return (client.pickups ?? []).some((p) => isOldDate(p.date));
  }, [client.pickups]);

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

  const handlePickup = async () => {
    try {
      const pickupCreated = await createPickup(client.id);
      dispatch({
        type: "PICKUP_CREATED",
        payload: {
          clientId: client.id,
          pickup: { id: pickupCreated.id, date: new Date().toISOString() },
        },
      });
      setShowHistory(true);
    } catch (error: any) {
      toast.error(
        `Error: ${getCleanErrorMessage(error) || "No se pudo registrar"}`,
      );
    }
  };

  const copyAffiliateNumber = () => {
    copyToClipboard(client.affiliateNumber);
  };

  return (
    <div className="flex flex-col gap-1 bg-[var(--card)] text-[var(--card-text)] border border-[var(--card-border)] p-4 py-2 pb-3 rounded-xl shadow-sm hover:border-blue-400/50 transition-all duration-300">
      <div className="flex flex-col">
        <div className="flex justify-between items-center gap-2">
          <h2 className="text-lg font-medium uppercase">{client.name}</h2>
          <ClientOptions client={client} />
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

      <div className="flex items-center justify-center gap-3 sm:gap-8 md:gap-12 my-1">
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
          handleClick={handlePickup}
          color="bg-[var(--secondary-button)] hover:bg-[var(--secondary-button-hover)]"
        />
      </div>

      {isIlluminated && (
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--illuminate-alert-bg)] border border-[var(--illuminate-border)] rounded-lg text-[var(--illuminate-text)] text-xs font-semibold my-1 animate-pulse-subtle">
          <InformationCircleIcon className="w-4 h-4 shrink-0" />
          <span>Nuevas recetas disponibles</span>
        </div>
      )}

      <PickupHistory showHistory={showHistory} setShowHistory={setShowHistory} pickups={client.pickups} clientId={client.id} />
    </div>
  );
}

export default ClientCard;
