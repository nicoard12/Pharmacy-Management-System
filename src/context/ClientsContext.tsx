import React, { createContext, useContext, useMemo, useReducer } from "react";
import { clientsReducer } from "../reducer/clients";
import type { ClientsAction, ClientType } from "../types";

type ClientsCtxValue = {
  clients: ClientType[];
  dispatch: React.Dispatch<ClientsAction>;
};

const ClientsContext = createContext<ClientsCtxValue | null>(null);

export function ClientsProvider({
  children,
  initialClients = [],
}: {
  children: React.ReactNode;
  initialClients?: ClientType[];
}) {
  const [clients, dispatch] = useReducer(clientsReducer, initialClients);

  const value = useMemo(() => ({ clients, dispatch }), [clients]);

  return (
    <ClientsContext.Provider value={value}>{children}</ClientsContext.Provider>
  );
}

export function useClients() {
  const ctx = useContext(ClientsContext);
  if (!ctx)
    throw new Error("useClients debe usarse dentro de <ClientsProvider />");
  return ctx.clients;
}

export function useClientsDispatch() {
  const ctx = useContext(ClientsContext);
  if (!ctx)
    throw new Error(
      "useClientsDispatch debe usarse dentro de <ClientsProvider />",
    );
  return ctx.dispatch;
}
