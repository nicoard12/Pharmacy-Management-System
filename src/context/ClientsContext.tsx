import React, { createContext, useContext, useMemo, useReducer } from "react";
import { clientsReducer } from "../reducer/clients";
import type { ClientsAction, ClientType, NormalizedClientsState } from "../types";

type ClientsCtxValue = {
  state: NormalizedClientsState;
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
  const [state, dispatch] = useReducer(clientsReducer, {
    ids: initialClients.map((c) => c.id),
    entities: initialClients.reduce((acc, c) => ({ ...acc, [c.id]: c }), {}),
  });

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <ClientsContext.Provider value={value}>{children}</ClientsContext.Provider>
  );
}

export function useClients() {
  const ctx = useContext(ClientsContext);
  if (!ctx)
    throw new Error("useClients debe usarse dentro de <ClientsProvider />");
  
  return useMemo(
    () => ctx.state.ids.map((id) => ctx.state.entities[id]),
    [ctx.state],
  );
}

export function useClientsDispatch() {
  const ctx = useContext(ClientsContext);
  if (!ctx)
    throw new Error(
      "useClientsDispatch debe usarse dentro de <ClientsProvider />",
    );
  return ctx.dispatch;
}
