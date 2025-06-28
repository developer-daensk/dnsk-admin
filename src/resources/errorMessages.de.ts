export type ErrorMessageKey =
  | 'network'
  | 'badRequest'
  | 'sessionExpired'
  | 'noPermission'
  | 'notFound'
  | 'serverError'
  | 'unexpectedError';

export const errorMessages: Record<ErrorMessageKey, string> = {
  network: 'Netzwerkfehler. Bitte überprüfen Sie Ihre Internetverbindung.',
  badRequest: 'Ungültige Anfrage',
  sessionExpired: 'Sitzung abgelaufen. Bitte melden Sie sich erneut an.',
  noPermission: 'Sie haben keine Berechtigung für diese Aktion',
  notFound: 'Die angeforderte Ressource wurde nicht gefunden',
  serverError: 'Serverfehler. Bitte versuchen Sie es später erneut',
  unexpectedError: 'Ein unerwarteter Fehler ist aufgetreten',
};
