// utils/errors.ts
export const getCleanErrorMessage = (error: any): string => {
  if (typeof error.message === 'string') {
    return error.message.split('Error: ').pop() || error.message;
  }
  return String(error);
};
