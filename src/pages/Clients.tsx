import { useEffect, useState } from "react";
import ClientToolbar from "../components/clients/ClientToolbar";
import ClientCard from "../components/clients/ClientCard";
import { getClients, type ClientType } from "../api/Client";

function Clients() {
  const [clients, setClients] = useState<ClientType[]>([]);
  const [filteredClients, setFilteredClients] = useState<ClientType[]>([]);

  const handleSearch = (search: string) => {
    const filtered = clients.filter(
      (client) =>
        client.name.toLowerCase().includes(search.toLowerCase()) ||
        client.affiliateNumber.toLowerCase().includes(search.toLowerCase()) ||
        client.personInCharge?.toLowerCase().includes(search.toLowerCase()) ||
        client.email?.toLowerCase().includes(search.toLowerCase())  ||
        client.phone?.toLowerCase().includes(search.toLowerCase()) 
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
    <div className="w-full px-2 flex-1 flex flex-col overflow-hidden items-center gap-1 ">
      <ClientToolbar onSearch={handleSearch} onClientCreated={handleClientCreated}/>
      <div className="w-full flex flex-1 overflow-y-auto flex-col gap-2 p-1">
        {filteredClients.map((client) => (
          <ClientCard key={client.id} client={client} />
        ))}
      </div>
    </div>
  );
}

export default Clients;
