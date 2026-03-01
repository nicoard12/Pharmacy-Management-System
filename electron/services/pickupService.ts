import { PickupRepository } from "../repository/pickupRepository";

export const PickupService = {
  createPickup: (clientId: number) => {
    return PickupRepository.create(clientId, new Date().toISOString());
  },
  updatePickupDate: (pickupId: number,  newDate: string) => {
    return PickupRepository.updateDate(pickupId, newDate);
  },
  deletePickup: (pickupId: number) => {
    return PickupRepository.delete(pickupId);
  }
};
