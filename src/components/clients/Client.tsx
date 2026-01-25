import { type Client } from "../../api/Client";

function Client({ client }: { client: Client }) {
  return (
    <div className="bg-white dark:bg-slate-900 p-2 rounded shadow">
      <h2 className="text-lg font-semibold">{client.name}</h2>
      <p className="text-gray-600">{client.email}</p>
      {client.phone && <p className="text-gray-600">{client.phone}</p>}
    </div>
  );
}

export default Client;
