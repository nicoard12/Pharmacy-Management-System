import { useEffect, useState } from "react";
import AddClient from "./AddClient";
import SearchBar from "./SearchBar";
import PlusIcon from "@heroicons/react/24/outline/PlusIcon";
import { type ClientType } from "../../types";
import Button from "../Button";
import { useClientsDispatch } from "../../context/ClientsContext";
import { BellIcon } from "@heroicons/react/24/outline";
import { BellIcon as BellIconSolid } from "@heroicons/react/24/solid";

function ClientToolbar({
  onSearch,
  onFilterAlertsChange,
}: {
  onSearch: (search: string) => void;
  onFilterAlertsChange: (showOnlyAlerts: boolean) => void;
}) {
  const [addClient, setAddClient] = useState(false);
  const [search, setSearch] = useState("");
  const [showOnlyAlerts, setShowOnlyAlerts] = useState(false);
  const dispatch = useClientsDispatch();

  const refreshClients = (newClient: ClientType) => {
    dispatch({ type: "CLIENT_CREATED", payload: newClient });
  };

  useEffect(() => {
    onSearch(search);
  }, [search]);

  useEffect(() => {
    onFilterAlertsChange(showOnlyAlerts);
  }, [showOnlyAlerts]);

  return (
    <div className="w-full max-w-4xl flex items-center justify-between gap-2 sm:gap-3 p-2 rounded shadow bg-[var(--card)] border border-[var(--card-border)]">
      <SearchBar value={search} onChange={setSearch} />

      <button
        onClick={() => setShowOnlyAlerts(!showOnlyAlerts)}
        className={`p-2 rounded-lg border transition-all duration-200 cursor-pointer flex items-center gap-2 text-sm font-medium ${showOnlyAlerts
          ? "bg-[var(--illuminate-bg)] border-[var(--illuminate-border)] text-[var(--illuminate-text)] shadow-sm"
          : "bg-[var(--card-secondary)] border-[var(--card-border)] text-[var(--card-text)] hover:bg-[var(--card-border)]"
          }`}
        title={showOnlyAlerts ? "Mostrar todos los clientes" : "Filtrar recetas disponibles"}
      >
        {showOnlyAlerts ? (
          <BellIconSolid className="w-5 h-5 text-emerald-600" />
        ) : (
          <BellIcon className="w-5 h-5" />
        )}
        <span className="hidden sm:inline">Con recetas</span>
      </button>

      <Button
        Icon={PlusIcon}
        text="Cliente"
        title="Añadir cliente"
        handleClick={() => setAddClient(true)}
        textSize="text-sm"
        hideTextOnMobile
      />
      {addClient && (
        <AddClient
          close={() => setAddClient(false)}
          refreshClients={refreshClients}
        />
      )}
    </div>
  );
}

export default ClientToolbar;
