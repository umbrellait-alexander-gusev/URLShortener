import { get } from 'lodash';

export const parseAPIError = (error) => {
  let message = error.data.originalError.message;
  let validationErrors = [];

  if (Array.isArray(get(error, 'data.validationErrors'))) {
    error.data.validationErrors.forEach((validationError) => {
      let validationPath = validationError.path;
      let validationMessage = validationError.message;

      if (typeof validationPath !== 'string') {
        validationPath = '';
      }

      if (typeof validationMessage !== 'string') {
        validationMessage = '';
      }

      validationPath = validationPath.trim();
      validationMessage = validationMessage.trim();

      if (validationPath && validationMessage) {
        validationErrors.push({ path: validationPath, message: validationMessage });
      }
    });
  }

  if (typeof message !== 'string') {
    message = '';
  }

  message = message.trim();

  if (!message) {
    message = 'Неизвестная ошибка';
  }

  return { message, validationErrors };
};
