import type { ClientType, ClientsAction, NormalizedClientsState } from "../types";

export function clientsReducer(
  state: NormalizedClientsState,
  action: ClientsAction,
): NormalizedClientsState {
  switch (action.type) {
    case "CLIENTS_SET": {
      const ids: number[] = [];
      const entities: Record<number, ClientType> = {};
      for (const client of action.payload) {
        ids.push(client.id);
        entities[client.id] = client;
      }
      return { ids, entities };
    }

    case "CLIENT_CREATED":
      return {
        ids: [action.payload.id, ...state.ids],
        entities: { ...state.entities, [action.payload.id]: action.payload },
      };

    case "CLIENT_DELETED": {
      const { [action.payload.id]: _, ...remainingEntities } = state.entities;
      return {
        ids: state.ids.filter((id) => id !== action.payload.id),
        entities: remainingEntities,
      };
    }

    case "CLIENT_EDITED":
      return {
        ...state,
        entities: { ...state.entities, [action.payload.id]: action.payload },
      };

    case "PICKUP_CREATED": {
      const client = state.entities[action.payload.clientId];
      if (!client) return state;
      return {
        ...state,
        entities: {
          ...state.entities,
          [client.id]: {
            ...client,
            pickups: [action.payload.pickup, ...(client.pickups ?? [])],
          },
        },
      };
    }

    case "PICKUP_DATE_UPDATED": {
      const client = state.entities[action.payload.clientId];
      if (!client) return state;
      return {
        ...state,
        entities: {
          ...state.entities,
          [client.id]: {
            ...client,
            pickups: (client.pickups ?? []).map((p) =>
              p.id === action.payload.pickupId
                ? { ...p, date: action.payload.date }
                : p,
            ),
          },
        },
      };
    }

    case "PICKUP_DELETED": {
      const client = state.entities[action.payload.clientId];
      if (!client) return state;
      return {
        ...state,
        entities: {
          ...state.entities,
          [client.id]: {
            ...client,
            pickups: (client.pickups ?? []).filter(
              (p) => p.id !== action.payload.pickupId,
            ),
          },
        },
      };
    }

    default:
      return state;
  }
}
