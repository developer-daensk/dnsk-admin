import { getDictionaryGenerator } from "@/Components/Entity/Locale/utils";

const en = {
  auth: {
    register: {
      title: "Register",
      description: "Create an account to get started",
      firstName: "First Name",
      firstNamePlaceholder: "Enter your first name",
      lastName: "Last Name",
      lastNamePlaceholder: "Enter your last name",
      email: "Email",
      emailPlaceholder: "Enter your email",
      password: "Password",
      passwordPlaceholder: "Enter your password",
      confirmPassword: "Confirm Password",
      confirmPasswordPlaceholder: "Confirm your password",
      acceptTerms: "I accept the",

      termsOfService: "Terms of Service",
      privacyPolicy: "Privacy Policy",
      and: "and",
      haveAccount: "Already have an account?",
      signIn: "Sign in",
      passwordMismatch: "Passwörter stimmen nicht überein",
      creatingAccount: "Konto wird erstellt...",
      createAccount: "Konto erstellen",
      errors: {
        general: "Ein Fehler ist aufgetreten",
        registrationFailed: "Registrierung fehlgeschlagen",
      },
    },
  },
};

const de: iDictionary = {
  auth: {
    register: {
      title: "Registrieren",
      description: "Erstellen Sie ein Konto, um zu beginnen",
      firstName: "Vorname",
      firstNamePlaceholder: "Geben Sie Ihren Vornamen ein",
      lastName: "Nachname",
      lastNamePlaceholder: "Geben Sie Ihren Nachnamen ein",
      email: "E-Mail",
      emailPlaceholder: "Geben Sie Ihre E-Mail ein",
      password: "Passwort",
      passwordPlaceholder: "Geben Sie Ihres Passwort ein",
      confirmPassword: "Passwort bestätigen",
      confirmPasswordPlaceholder: "Bestätigen Sie Ihr Passwort",
      acceptTerms: "Ich akzeptiere die",
      termsOfService: "Nutzungsbedingungen",
      privacyPolicy: "Datenschutz",
      and: "und",
      haveAccount: "Haben Sie bereits ein Konto?",
      signIn: "Anmelden",
      passwordMismatch: "Passwörter stimmen nicht überein",
      creatingAccount: "Konto wird erstellt...",
      createAccount: "Konto erstellen",
      errors: {
        general: "Ein Fehler ist aufgetreten",
        registrationFailed: "Registrierung fehlgeschlagen",
      },
    },
  },
};
export type iDictionary = typeof en;
export const getDictionary = getDictionaryGenerator<typeof en>({ en, de });
