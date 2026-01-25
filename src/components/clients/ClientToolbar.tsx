import { useEffect, useState } from "react";
import AddClient from "./AddClient";
import Searcher from "./Searcher";
import PlusIcon from "@heroicons/react/16/solid/PlusIcon";

function ClientToolbar({ onSearch }: { onSearch: (search: string) => void }) {
  const [addClient, setAddClient] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    onSearch(search);
  }, [search]);

  return (
    <div className="w-full flex items-center justify-between p-2 rounded shadow bg-[var(--card)]">
      <Searcher value={search} onChange={setSearch} />
      <button
        onClick={() => setAddClient(true)}
        className="flex items-center gap-1 cursor-pointer p-1 pr-2 rounded font-medium bg-[var(--button)] hover:bg-[var(--button-hover)] text-white"
      >
        <PlusIcon className="h-4 w-4" /> Cliente
      </button>
      {addClient && <AddClient />}
    </div>
  );
}

export default ClientToolbar;
