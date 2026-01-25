import { useEffect, useState } from "react";
import AddClient from "./AddClient";
import Searcher from "./Searcher";
import PlusIcon from "@heroicons/react/24/outline/PlusIcon";
import { type ClientType } from "../../api/Client";

function ClientToolbar({ onSearch, onClientCreated }: { onSearch: (search: string) => void, onClientCreated: (newClient: ClientType) => void }) {
  const [addClient, setAddClient] = useState(false);
  const [search, setSearch] = useState("");

  const refreshClients = (newClient: ClientType) => {
    onClientCreated(newClient);
  }

  useEffect(() => {
    onSearch(search);
  }, [search]);

  return (
    <div className="w-full max-w-4xl flex items-center justify-between gap-3 p-2 rounded shadow bg-[var(--card)] border border-[var(--card-border)]">
      <Searcher value={search} onChange={setSearch} />
      <button
        onClick={() => setAddClient(true)}
        className="text-sm flex items-center gap-1 cursor-pointer p-2 pl-1 rounded font-medium bg-[var(--button)] hover:bg-[var(--button-hover)] text-white"
      >
        <PlusIcon className="h-5.5 " /> Cliente
      </button>
      {addClient && <AddClient close={() => setAddClient(false)} refreshClients={refreshClients}/>}
    </div>
  );
}

export default ClientToolbar;
