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

    case "PICKUP_CREATED":
      return state.map((c) =>
        c.id === action.payload.clientId
          ? { ...c, pickups: [action.payload.pickup, ...(c.pickups ?? [])] }
          : c,
      );

    case "PICKUP_DATE_UPDATED":
      return state.map((c) =>
        c.id === action.payload.clientId
          ? {
              ...c,
              pickups: (c.pickups ?? []).map((p) =>
                p.id === action.payload.pickupId
                  ? { ...p, date: action.payload.date }
                  : p,
              ),
            }
          : c,
      );

    case "PICKUP_DELETED":
      return state.map((c) =>
        c.id === action.payload.clientId
          ? {
              ...c,
              pickups: (c.pickups ?? []).filter(
                (p) => p.id !== action.payload.pickupId,
              ),
            }
          : c,
      );

    default:
      return state;
  }
}
