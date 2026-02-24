import { useEffect, useMemo, useState } from "react";
import ClientToolbar from "../components/clients/ClientToolbar";
import ClientCard from "../components/clients/ClientCard";
import { getClients } from "../api/client";
import { useClients, useClientsDispatch } from "../context/ClientsContext";

function Clients() {
  const clients = useClients();
  const dispatch = useClientsDispatch();
  const [search, setSearch] = useState("");

  const filteredClients = useMemo(() => {
    if (!search.trim()) return clients;

    const lower = search.toLowerCase();

    return clients.filter(
      (client) =>
        client.name.toLowerCase().includes(lower) ||
        client.affiliateNumber.toLowerCase().includes(lower) ||
        (client.personInCharge?.toLowerCase().includes(lower) ?? false),
    );
  }, [clients, search]);

  const handleSearch = (value: string) => setSearch(value);

  const fetchClients = async () => {
    try {
      const fetchedClients = await getClients();
      dispatch({ type: "CLIENTS_SET", payload: fetchedClients });
    } catch (error) {
      console.log("Error al obtener clientes:", error);
      dispatch({ type: "CLIENTS_SET", payload: [] });
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <div className="w-full px-2 flex-1 flex flex-col overflow-hidden items-center justify-center gap-1 mt-1">
      <ClientToolbar onSearch={handleSearch} />

      <div className="w-full max-w-4xl flex flex-1 overflow-y-auto flex-col gap-2 p-1">
        {clients.length === 0 && (
          <div className="flex flex-1 flex-col items-center justify-center text-center text-gray-500 gap-2">
            <span className="text-lg">🗂️ Todavía no hay clientes</span>
            <span className="text-sm">Creá tu primer cliente para empezar</span>
          </div>
        )}

        {clients.length > 0 && filteredClients.length === 0 && (
          <div className="flex flex-1 flex-col items-center justify-center text-center text-gray-500 gap-2">
            <span className="text-lg">🔍 No hay resultados</span>
            <span className="text-sm">
              Probá con otro nombre o número de afiliado
            </span>
          </div>
        )}

        {filteredClients.map((client) => (
          <ClientCard key={client.id} client={client} />
        ))}
      </div>
    </div>
  );
}

export default Clients;
