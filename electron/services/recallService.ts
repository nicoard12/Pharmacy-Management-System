import { RecallRepository } from "../repository/recallRepository";

export const RecallService = {
  createRecall: (clientId: number) => {
    return RecallRepository.create(clientId, new Date().toISOString());
  }
};