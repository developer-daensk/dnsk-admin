type ErrorMessageKey =
  | 'network'
  | 'badRequest'
  | 'sessionExpired'
  | 'noPermission'
  | 'notFound'
  | 'serverError'
  | 'unexpectedError';

export type HttpStatus = 400 | 401 | 403 | 404 | 500;

export const errorMessages: Record<ErrorMessageKey, string> = {
  network: 'Network error. Please check your internet connection.',
  badRequest: 'Bad request',
  sessionExpired: 'Session expired. Please login again.',
  noPermission: 'You do not have permission to perform this action',
  notFound: 'The requested resource was not found',
  serverError: 'Server error. Please try again later',
  unexpectedError: 'An unexpected error occurred',
};

export const messageConfig = {
  top: 24,
  duration: 3,
  maxCount: 3,
};

export const httpStatusMessages: Record<HttpStatus, ErrorMessageKey> = {
  400: 'badRequest',
  401: 'sessionExpired',
  403: 'noPermission',
  404: 'notFound',
  500: 'serverError',
};
