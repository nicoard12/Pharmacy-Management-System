import type { ClientType, ClientsAction } from "../types";

export function clientsReducer(
  state: ClientType[],
  action: ClientsAction,
): ClientType[] {
  switch (action.type) {
    case "CLIENTS_SET":
      return action.payload;

    case "CLIENT_CREATED":
      return [action.payload, ...state];

    case "CLIENT_DELETED":
      return state.filter((c) => c.id !== action.payload.id);

    case "CLIENT_EDITED":
      return state.map((c) =>
        c.id === action.payload.id ? action.payload : c,
      );

    case "RECALL_CREATED":
      return state.map((c) =>
        c.id === action.payload.clientId
          ? { ...c, recalls: [action.payload.recall, ...(c.recalls ?? [])] }
          : c,
      );

    case "RECALL_DATE_UPDATED":
      return state.map((c) =>
        c.id === action.payload.clientId
          ? {
              ...c,
              recalls: (c.recalls ?? []).map((r) =>
                r.id === action.payload.recallId
                  ? { ...r, date: action.payload.date }
                  : r,
              ),
            }
          : c,
      );

    case "RECALL_DELETED":
      return state.map((c) =>
        c.id === action.payload.clientId
          ? {
              ...c,
              recalls: (c.recalls ?? []).filter(
                (r) => r.id !== action.payload.recallId,
              ),
            }
          : c,
      );

    default:
      return state;
  }
}
