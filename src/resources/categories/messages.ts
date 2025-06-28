import { PATTERNS } from '../utils/constants';

export const messages = {
  welcome: 'Welcome to Marketplace Admin',
  loginSuccess: 'Successfully logged in',
  logoutSuccess: 'Successfully logged out',
  formError: 'Please check your input',
  otpSent: `We've sent a verification code to ${PATTERNS.EMAIL}`,
  resendOtpTimer: `Resend OTP in ${PATTERNS.SECONDS}s`,
  expandSidebar: 'Expand Sidebar',
  collapseSidebar: 'Collapse Sidebar',
  signOut: 'Sign Out',
} as const;
