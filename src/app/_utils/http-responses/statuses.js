export default {
  OK: {
    code: 200,
    name: 'OK',
    message: 'The server successfully processed the request.'
  },
  CREATED: {
    code: 201,
    name: 'Created',
    message: 'The server successfully processed the request and a new resource has been created as a result.'
  },
  NO_CONTENT: {
    code: 204,
    name: 'No Content',
    message: 'The server successfully processed the request and is not returning any content.'
  },
  PARTIAL_CONTENT: {
    code: 206,
    name: 'Partial Content',
    message: 'The server successfully processed the request and is returning the requested ranges of data.'
  },
  UNAUTHORIZED: {
    code: 401,
    name: 'Unauthorized',
    message: 'The server refuses to authorize the request due to a lack of valid user authentication credentials.'
  },
  FORBIDDEN: {
    code: 403,
    name: 'Forbidden',
    message: 'The server refuses to authorize the request due to a lack of user permissions.'
  },
  NOT_FOUND: {
    code: 404,
    name: 'Not Found',
    message: "The server can't find the requested resource."
  },
  CONFLICT: {
    code: 409,
    name: 'Conflict',
    message: "The server can't perform the request because it conflicts with the current state of the server."
  },
  UNPROCESSABLE_ENTITY: {
    code: 422,
    name: 'Unprocessable Entity',
    message: "The server can't perform the request because it is well-formed but has semantic errors."
  },
  INTERNAL_SERVER_ERROR: {
    code: 500,
    name: 'Internal Server Error',
    message: "The server has encountered a situation it doesn't know how to handle."
  }
};
