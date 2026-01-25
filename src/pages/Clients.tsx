import { useState } from "react";
import ClientToolbar from "../components/clients/ClientToolbar";
import Client from "../components/clients/Client";

function Clients() {
  const [clients, setClients] = useState([
    { id: 1, name: "John Doe", email: "random@example.com" },
  ]);

  return (
    <div className="flex flex-1 flex-col items-center">
      <ClientToolbar />
      <div>
        {clients.map((client) => (
          <Client key={client.id} client={client} />
        ))}
      </div>
    </div>
  );
}

export default Clients;
