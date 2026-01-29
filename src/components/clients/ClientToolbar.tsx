import { useEffect, useState } from "react";
import AddClient from "./AddClient";
import Searcher from "./Searcher";
import PlusIcon from "@heroicons/react/24/outline/PlusIcon";
import { type ClientType } from "../../api/client";
import Button from "../Button";

function ClientToolbar({
  onSearch,
  onClientCreated,
}: {
  onSearch: (search: string) => void;
  onClientCreated: (newClient: ClientType) => void;
}) {
  const [addClient, setAddClient] = useState(false);
  const [search, setSearch] = useState("");

  const refreshClients = (newClient: ClientType) => {
    onClientCreated(newClient);
  };

  useEffect(() => {
    onSearch(search);
  }, [search]);

  return (
    <div className="w-full max-w-4xl flex items-center justify-between gap-3 p-2 rounded shadow bg-[var(--card)] border border-[var(--card-border)]">
      <Searcher value={search} onChange={setSearch} />
      <Button
        Icon={PlusIcon}
        text="Cliente"
        handleClick={() => setAddClient(true)}
        textSize="text-sm"
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
