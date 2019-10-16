import { get } from 'lodash';

const getErrorMessage = (error) => {
  let message = get(error, 'message');

  if (typeof message !== 'string') {
    message = undefined;
  } else {
    message = message.trim();
  }

  if (get(error, 'code') === 11000 && get(error, 'name') === 'MongoError') {
    message = 'Oops! This url is already taken = (';
  }

  if (!message) {
    message = 'Unknown error';
  }
  return message;
};

const getValidationErrors = (error) => {
  const validationErrors = [];

  if (!Array.isArray(get(error, 'inner'))) {
    return validationErrors;
  }

  error.inner.forEach((validationError) => {
    const path = validationError.path;
    const message = validationError.message;

    if (
      validationError.path !== '' &&
      validationError.path !== undefined &&
      validationError.message !== '' &&
      validationError.message !== undefined
    ) {
      validationErrors.push({ path, message });
    }
  });

  return validationErrors;
};

export class AppError extends Error {
  constructor(error) {
    super();

    this.message = getErrorMessage(error);
    this.originalError = error;
    this.validationErrors = getValidationErrors(error);
  }
}
