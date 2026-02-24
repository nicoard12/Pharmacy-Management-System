import { ClientType } from "../types";
import { ClientRepository } from "../repository/clientRepository";

export const ClientService = {
  getAllClients: () => {
    return ClientRepository.findAll();
  },

  createClient: (client: Omit<ClientType, "id">) => {
    if (!client.name?.trim() || !client.affiliateNumber?.trim()) {
      throw new Error("El nombre y el número de afiliado son obligatorios.");
    }

    const existingClient = ClientRepository.findByAffiliateNumber(
      client.affiliateNumber,
    );
    if (existingClient) {
      throw new Error("Ya existe un cliente con este número de afiliado.");
    }

    return ClientRepository.save(client);
  },

  updateClient: (client: ClientType) => {
    const existingClient = ClientRepository.findByAffiliateNumber(
      client.affiliateNumber,
    );

    if (existingClient && existingClient.id !== client.id) {
      throw new Error("El número de afiliado ya está en uso por otro cliente.");
    }

    const updated = ClientRepository.update(client);
    if (!updated) {
      throw new Error("No se pudo actualizar: Cliente no encontrado.");
    }

    return true;
  },

  deleteClient: (clientId: number) => {
    const deleted = ClientRepository.delete(clientId);
    if (!deleted) {
      throw new Error("No se pudo eliminar: El cliente no existe.");
    }
    return true;
  },

  savePrescriptions: (clientId: number, prescriptions: string) => {
    if (clientId <= 0) throw new Error("ID de cliente inválido.");

    const success = ClientRepository.setPrescriptions(clientId, prescriptions);
    if (!success) {
      throw new Error(
        "No se pudo guardar la prescripción. Cliente no encontrado.",
      );
    }
    return true;
  },

  getPrescriptions: (clientId: number) => {
    return ClientRepository.getPrescriptions(clientId);
  },
};
