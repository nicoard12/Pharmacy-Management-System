import { useEffect, useState } from "react";
import AddClient from "./AddClient";
import SearchBar from "./SearchBar";
import PlusIcon from "@heroicons/react/24/outline/PlusIcon";
import { type ClientType } from "../../types";
import Button from "../Button";
import { useClientsDispatch } from "../../context/ClientsContext";

function ClientToolbar({ onSearch }: { onSearch: (search: string) => void }) {
  const [addClient, setAddClient] = useState(false);
  const [search, setSearch] = useState("");
  const dispatch = useClientsDispatch();

  const refreshClients = (newClient: ClientType) => {
    dispatch({ type: "CLIENT_CREATED", payload: newClient });
  };

  useEffect(() => {
    onSearch(search);
  }, [search]);

  return (
    <div className="w-full max-w-4xl flex items-center justify-between gap-3 p-2 rounded shadow bg-[var(--card)] border border-[var(--card-border)]">
      <SearchBar value={search} onChange={setSearch} />
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
