export const TRUCK = {
  MODAL: {
    TITLE: 'Ihr LKW',
    DESCRIPTION:
      'Verfügbarkeit, Lieferzeiten und Preise werden basierend auf den hier eingegebenen Informationen berechnet. Alle Informationen können jederzeit angepasst werden.',

    LABELS: {
      POSTAL_CODE: 'Postleitzahl',
      CITY: 'Stadt',
    },

    PLACEHOLDERS: {
      POSTAL_CODE: 'Postleitzahl eingeben',
      CITY: 'Stadt eingeben',
    },

    BUTTONS: {
      CLOSE: 'Schließen',
      SAVE: 'Speichern',
    },

    VALIDATION_MESSAGES: {
      POSTAL_CODE: {
        REQUIRED: 'Postleitzahl ist erforderlich',
        MIN_LENGTH: 'Postleitzahl muss mindestens 3 Zeichen haben',
        MAX_LENGTH: 'Postleitzahl darf nicht mehr als 10 Zeichen haben',
        INVALID_FORMAT:
          'Bitte geben Sie eine gültige Postleitzahl ein (z.B. 12345, K1A 0A6, SW1A 1AA)',
      },
      CITY: {
        REQUIRED: 'Stadt ist erforderlich',
        MIN_LENGTH: 'Stadtname muss mindestens 2 Zeichen haben',
        MAX_LENGTH: 'Stadtname darf nicht mehr als 50 Zeichen haben',
        INVALID_FORMAT:
          'Stadtname darf nur Buchstaben, Leerzeichen, Bindestriche, Apostrophe und Punkte enthalten',
        CONSECUTIVE_CHARS: 'Stadtname darf keine aufeinanderfolgenden Sonderzeichen haben',
        INVALID_START_END: 'Stadtname darf nicht mit Sonderzeichen beginnen oder enden',
      },
      FORM_INVALID: 'Bitte geben Sie gültige Postleitzahl und Stadt-Informationen ein.',
    },

    SUCCESS_MESSAGES: {
      SAVED: 'LKW-Standortinformationen erfolgreich gespeichert!',
    },

    ERROR_MESSAGES: {
      SAVE_FAILED:
        'Fehler beim Speichern der LKW-Standortinformationen. Bitte versuchen Sie es erneut.',
      LOAD_FAILED: 'Fehler beim Laden der vorhandenen LKW-Standortdaten',
    },

    TOOLTIPS: {
      AUTO_CALCULATED: 'Automatisch berechnet',
      ESTIMATED_DELIVERY: 'Geschätzte Lieferung',
    },
  },

  SHIPPING: {
    CALCULATION_MESSAGES: {
      SUCCESS: (distance: number) =>
        `Versand berechnet basierend auf Entfernung (~${distance.toFixed(1)} Meilen)`,
      ERROR: 'Versand kann nicht automatisch berechnet werden. Bitte manuell eingeben.',
    },

    DELIVERY_TIMES: {
      SAME_DAY: 'Lieferung am selben Tag',
      TWO_TO_FOUR_HOURS: '2-4 Stunden',
      FOUR_TO_EIGHT_HOURS: '4-8 Stunden',
      NEXT_DAY: 'Lieferung am nächsten Tag',
      BUSINESS_DAYS: (days: number) => `${days}-${days + 1} Werktage`,
      DEFAULT: '2-3 Werktage',
    },
  },
} as const;
