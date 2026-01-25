import { type ClientType } from "../../api/Client";

function Client({ client }: { client: ClientType }) {
  return (
    <div className="bg-[var(--card)] text-[var(--text-card)] border border-[var(--card-border)] p-2 rounded-md shadow w-full">
      <h2 className="text-lg font-semibold">{client.name}</h2>
      <p className="">{client.email}</p>
      {client.phone && <p className="">{client.phone}</p>}
    </div>
  );
}

export default Client;
