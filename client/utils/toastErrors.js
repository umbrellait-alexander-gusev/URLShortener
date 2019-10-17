import { toast } from 'react-toastify';

export const toastErrors = (error) => {
  const validationErrors = error.validationErrors;

  if (validationErrors.length) {
    validationErrors.forEach((validationError) => {
      toast.error(validationError.message);
    });
  } else {
    toast.error(error.message);
  }
};
