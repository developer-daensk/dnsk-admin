import { PATTERNS } from '../utils/constants';

export const messages = {
  welcome: 'Willkommen im Marketplace Admin',
  loginSuccess: 'Erfolgreich angemeldet',
  logoutSuccess: 'Erfolgreich abgemeldet',
  formError: 'Bitte überprüfen Sie Ihre Eingabe',
  otpSent: `Wir haben einen Verifizierungscode an ${PATTERNS.EMAIL} gesendet`,
  resendOtpTimer: `OTP erneut senden in ${PATTERNS.SECONDS}s`,
  expandSidebar: 'Seitenleiste erweitern',
  collapseSidebar: 'Seitenleiste einklappen',
  signOut: 'Abmelden',
} as const;
