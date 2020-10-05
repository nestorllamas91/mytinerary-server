export function handleResponseSuccess(origin, status, message, data, res) {
  if (status.code === 204) return res.status(204).end();
  return res.status(status.code).json({
    status: {
      type: 'success',
      ...status
    },
    output: {
      origin: `${origin.functionName} - ${origin.path.replace(/\\/g, '/')}`,
      message,
      data
    }
  });
}

export function handleResponseError(err, req, res, next) {
  const { origin, status, message, errorsValidation, errorsConflict } = err;
  return res.status(status.code).json({
    status: {
      type: 'error',
      ...status
    },
    output: {
      origin: `${origin.functionName} - ${origin.path.replace(/\\/g, '/')}`,
      message: message ? `${message.name}: ${message.message}` : undefined,
      errorsValidation,
      errorsConflict: errorsConflict ? errorsConflict.map(error => `${error.name}: ${error.message}`) : undefined
    }
  });
}

export class HandlerResponseError extends Error {
  constructor(origin, status, message, errorsValidation, errorsConflict) {
    super();
    this.origin = origin;
    this.status = status;
    this.message = message;
    this.errorsValidation = errorsValidation;
    this.errorsConflict = errorsConflict;
  }
}
