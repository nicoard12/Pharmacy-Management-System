import { RecallRepository } from "../repository/recallRepository";

export const RecallService = {
  createRecall: (clientId: number) => {
    return RecallRepository.create(clientId, new Date().toISOString());
  },
  updateRecallDate: (recallId: number,  newDate: string) => {
    return RecallRepository.updateDate(recallId, newDate);
  },
  deleteRecall: (recallId: number) => {
    return RecallRepository.delete(recallId);
  }
};