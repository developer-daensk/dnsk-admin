import { getDictionaryGenerator } from "@/Components/Entity/Locale/utils";

const en = {
  auth: {
    login: {
      title: "Login",
      description: "Enter your email to login",
      noAccount: "Don't have an account?",
      signUp: "Sign up",
      verificationCode: "Verification Code",
      verificationCodePlaceholder: "Enter the code sent to your email",
      resendCode: "Resend Code",
      verifyingCode: "Verifying code...",
      verifyCode: "Verify Code",
      backToEmail: "Back to Email",
      email: "Email",
      emailPlaceholder: "Enter your email",
      sendCode: "Send Code",
      sendingCode: "Sending code...",
      codeStep: {
        title: "Enter the code",
        description: "Enter the code sent to your email",
      },
      errors: {
        invalidCode: "Invalid code",
        codeExpired: "Code expired",
        general: "An error occurred",
        codeSendFailed: "Failed to send code",
        invalidEmail: "Invalid email",
        backToEmail: "Back to Email",
      },
    },
  },
};

const de: iDictionary = {
  auth: {
    login: {
      title: "Login",
      description: "Geben Sie Ihre E-Mail ein, um sich anzumelden",
      noAccount: "Kein Konto?",
      signUp: "Registrieren",
      verificationCode: "Verifizierungscode",
      verificationCodePlaceholder:
        "Geben Sie den Code ein, der an Ihre E-Mail gesendet wurde",
      resendCode: "Code erneut senden",
      verifyingCode: "Code wird verifiziert...",
      verifyCode: "Code verifizieren",
      backToEmail: "Zurück zur E-Mail",
      email: "E-Mail",
      emailPlaceholder: "Geben Sie Ihre E-Mail ein",
      sendCode: "Code senden",
      sendingCode: "Code wird gesendet...",
      codeStep: {
        title: "Enter the code",
        description:
          "Geben Sie den Code ein, der an Ihre E-Mail gesendet wurde",
      },
      errors: {
        invalidCode: "Ungültiger Code",
        codeExpired: "Code abgelaufen",
        general: "Ein Fehler ist aufgetreten",
        codeSendFailed: "Code konnte nicht gesendet werden",
        invalidEmail: "Ungültige E-Mail",
        backToEmail: "Zurück zur E-Mail",
      },
    },
  },
};
export type iDictionary = typeof en;
export const getDictionary = getDictionaryGenerator<typeof en>({ en, de });
