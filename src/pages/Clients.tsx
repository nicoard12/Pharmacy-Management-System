import { useEffect, useState } from "react";
import ClientToolbar from "../components/clients/ClientToolbar";
import Client from "../components/clients/Client";
import { getClients, type ClientType } from "../api/Client";

function Clients() {
  const [clients, setClients] = useState<ClientType[]>([]);
  const [filteredClients, setFilteredClients] = useState<ClientType[]>([]);

  const handleSearch = (search: string) => {
    const filtered = clients.filter(
      (client) =>
        client.name.toLowerCase().includes(search.toLowerCase()) ||
        client.affiliateNumber.toLowerCase().includes(search.toLowerCase()),
    );
    setFilteredClients(filtered);
  };

  const fetchClients = async () => {
    const fetchedClients = await getClients();
    setClients(fetchedClients);
    setFilteredClients(fetchedClients);
  };

  const handleClientCreated = (newClient: ClientType) => {
    setClients((prev) => [newClient, ...prev]);
    setFilteredClients((prev) => [newClient, ...prev]);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <div className="w-full px-5 flex flex-1 flex-col items-center gap-4 mt-2">
      <ClientToolbar onSearch={handleSearch} onClientCreated={handleClientCreated}/>
      <div className="w-full flex flex-col gap-2">
        {filteredClients.map((client) => (
          <Client key={client.id} client={client} />
        ))}
      </div>
    </div>
  );
}

export default Clients;
