import { useState } from "react";
import ClientToolbar from "../components/clients/ClientToolbar";
import Client from "../components/clients/Client";

function Clients() {
  const [clients, setClients] = useState([
    { id: 1, name: "John Doe", email: "random@example.com" },
    { id: 2, name: "John Doe 2", email: "random2@example.com" },
  ]);
  const [filteredClients, setFilteredClients] = useState(clients);

  const handleSearch = (search: string) => {
    const filtered = clients.filter(
      (client) =>
        client.name.toLowerCase().includes(search.toLowerCase()) ||
        client.email.toLowerCase().includes(search.toLowerCase()),
    );
    setFilteredClients(filtered);
  };

  return (
    <div className="w-full px-5 flex flex-1 flex-col items-center gap-4 mt-2">
      <ClientToolbar onSearch={handleSearch} />
      <div className="w-full flex flex-col gap-2">
        {filteredClients.map((client) => (
          <Client key={client.id} client={client} />
        ))}
      </div>
    </div>
  );
}

export default Clients;
