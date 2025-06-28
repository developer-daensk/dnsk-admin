export const ORDERS = {
  TITLE: 'Bestellverwaltung',
  DESCRIPTION:
    'Verwalten Sie alle Kundenbestellungen, verfolgen Sie deren Status, bearbeiten Sie Rückerstattungen und exportieren Sie Bestelldaten.',
  TRUCK_BUTTON: 'Ihr LKW',

  SECTIONS: {
    OVERVIEW: 'Bestellungsübersicht',
    TABLE: 'Bestellungsliste',
    STATISTICS: 'Bestellstatistiken',
  },

  STATISTICS: {
    TOTAL_ORDERS: 'Gesamtbestellungen',
    PENDING_ORDERS: 'Ausstehende Bestellungen',
    PROCESSING_ORDERS: 'In Bearbeitung',
    COMPLETED_ORDERS: 'Abgeschlossen',
    TOTAL_REVENUE: 'Gesamtumsatz',
    AVERAGE_ORDER_VALUE: 'Durchschnittlicher Bestellwert',
  },

  TABLE: {
    COLUMNS: {
      ORDER_NUMBER: 'Bestellnummer',
      DATE: 'Datum',
      ADDRESS: 'Adresse',
      TOTAL: 'Gesamt',
      QUANTITY: 'Menge',
      STATUS: 'Status',
      ACTIONS: 'Aktionen',
      CUSTOMER: 'Kunde',
      PAYMENT_STATUS: 'Zahlungsstatus',
      ITEMS: 'Artikel',
    },
    PLACEHOLDERS: {
      SEARCH:
        'Suchen Sie im aktuellen Tab nach Bestellnummer, Kundeninformationen, Produkten, Daten, Beträgen oder Verfolgung...',
    },
    ACTIONS: {
      VIEW: 'Details anzeigen',
      EDIT: 'Bestellung bearbeiten',
      UPDATE_STATUS: 'Status aktualisieren',
      PRINT: 'Rechnung drucken',
      TRACK: 'Sendung verfolgen',
      CANCEL: 'Bestellung stornieren',
      REFUND: 'Rückerstattung bearbeiten',
    },
    NO_RESULTS: 'Keine Bestellungen gefunden',
    TOTAL_ITEMS: (total: number, range: [number, number]) =>
      `Zeige ${range[0]}-${range[1]} von ${total} Bestellungen`,
    STATUS_UPDATED: 'Bestellstatus erfolgreich aktualisiert',
    ERROR_UPDATE: 'Fehler beim Aktualisieren des Bestellstatus',
  },

  TABS: {
    OVERVIEW: 'Übersicht',
    IN_PROGRESS: 'In Bearbeitung',
    IN_DELIVERY: 'In Zustellung',
    REJECTED: 'Abgelehnt',
  },

  BULK_ACTIONS: {
    LABEL: 'Massenaktionen',
    UPDATE_STATUS: 'Status aktualisieren',
    EXPORT: 'Ausgewählte exportieren',
    DELETE: 'Ausgewählte löschen',
    PRINT: 'Rechnungen drucken',
  },

  QUICK_ACTIONS: {
    EXPORT_ALL: 'Alle exportieren',
    IMPORT: 'Bestellungen importieren',
    SETTINGS: 'Bestelleinstellungen',
  },

  ERRORS: {
    FETCH_FAILED: 'Fehler beim Laden der Bestellungen',
    UPDATE_FAILED: 'Fehler beim Aktualisieren der Bestellung',
    DELETE_FAILED: 'Fehler beim Löschen der Bestellung',
    EXPORT_FAILED: 'Fehler beim Exportieren der Bestellungen',
  },

  PAGINATION: {
    PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
  },

  DETAILS_MODAL: {
    TITLE: 'Bestelldetails',
    SUBTITLE: 'Umfassende Bestellinformationen anzeigen',
    ACTIONS: {
      COPY_ORDER_NUMBER: 'Bestellnummer kopieren',
      PRINT_ORDER: 'Bestellung drucken',
    },
    MESSAGES: {
      ORDER_NUMBER_COPIED: 'Bestellnummer in die Zwischenablage kopiert',
      PRINT_DIALOG_OPENED: 'Druckdialog geöffnet',
    },
    SECTIONS: {
      ORDER_PROGRESS: 'Bestellfortschritt',
      CUSTOMER_INFORMATION: 'Kundeninformationen',
      ORDER_ITEMS: 'Bestellartikel',
      PAYMENT_DETAILS: 'Zahlungsdetails',
      ORDER_SUMMARY: 'Bestellzusammenfassung',
      ORDER_NOTES: 'Bestellnotizen',
    },
    LABELS: {
      CREATED: 'Erstellt',
      CUSTOMER: 'Kunde',
      EMAIL: 'E-Mail',
      PHONE: 'Telefon',
      SHIPPING_ADDRESS: 'Lieferadresse',
      STATUS: 'Status',
      METHOD: 'Methode',
      TRACKING: 'Verfolgung',
      SUBTOTAL: 'Zwischensumme:',
      TAX: 'Steuer:',
      SHIPPING: 'Versand:',
      TOTAL: 'Gesamt:',
      VARIATION: 'Variante:',
      QUANTITY_SHORT: 'Menge:',
      ITEMS_COUNT: (count: number) => `${count} Artikel`,
      ITEMS_SECTION_TITLE: (count: number) => `Bestellartikel (${count} Artikel)`,
    },
    STATUS_STEPS: {
      PENDING: {
        TITLE: 'Ausstehend',
        DESCRIPTION: 'Bestellung erhalten',
      },
      PROCESSING: {
        TITLE: 'In Bearbeitung',
        DESCRIPTION: 'Wird vorbereitet',
      },
      SHIPPED: {
        TITLE: 'Versendet',
        DESCRIPTION: 'Unterwegs',
      },
      DELIVERED: {
        TITLE: 'Geliefert',
        DESCRIPTION: 'Abgeschlossen',
      },
    },
  },

  ORDER_FORM: {
    HEADER: {
      TITLE: 'Bestellung bearbeiten',
      CREATED: 'Erstellt',
    },

    SECTIONS: {
      ORDER_INFORMATION: 'Bestellinformationen',
      CUSTOMER_INFORMATION: 'Kundeninformationen',
      ORDER_ITEMS: 'Bestellartikel',
      ADDITIONAL_NOTES: 'Zusätzliche Notizen',
    },

    LABELS: {
      ORDER_NUMBER: 'Bestellnummer',
      STATUS: 'Status',
      PAYMENT_STATUS: 'Zahlungsstatus',
      PAYMENT_METHOD: 'Zahlungsmethode',
      TRACKING_NUMBER: 'Sendungsverfolgungsnummer',
      CUSTOMER_NAME: 'Name',
      CUSTOMER_EMAIL: 'E-Mail',
      CUSTOMER_PHONE: 'Telefon',
      CUSTOMER_ADDRESS: 'Adresse',
      CUSTOMER_CITY: 'Stadt',
      CUSTOMER_STATE: 'Bundesland',
      CUSTOMER_ZIP_CODE: 'Postleitzahl',
      CUSTOMER_COUNTRY: 'Land',
      SUBTOTAL: 'Zwischensumme',
      TAX: 'Steuer',
      SHIPPING: 'Versand',
      TOTAL: 'Gesamt',
      NOTES: 'Notizen',
    },

    PLACEHOLDERS: {
      ORDER_NUMBER: 'Bestellnummer eingeben',
      TRACKING_NUMBER: 'Sendungsverfolgungsnummer eingeben',
      PRODUCT_NAME: 'Produktname',
      VARIATION: 'Variante',
      QUANTITY: 'Menge',
      UNIT_PRICE: 'Stückpreis',
      PRICE: '0,00',
      NOTES: 'Fügen Sie zusätzliche Notizen zu dieser Bestellung hinzu...',
    },

    STATUS_OPTIONS: {
      PENDING: 'Ausstehend',
      PROCESSING: 'In Bearbeitung',
      SHIPPED: 'Versendet',
      DELIVERED: 'Geliefert',
      CANCELLED: 'Storniert',
      REFUNDED: 'Rückerstattet',
    },

    PAYMENT_STATUS_OPTIONS: {
      PENDING: 'Ausstehend',
      PAID: 'Bezahlt',
      FAILED: 'Fehlgeschlagen',
      REFUNDED: 'Rückerstattet',
    },

    PAYMENT_METHOD_OPTIONS: {
      CREDIT_CARD: 'Kreditkarte',
      PAYPAL: 'PayPal',
      BANK_TRANSFER: 'Banküberweisung',
      CASH_ON_DELIVERY: 'Nachnahme',
    },

    VALIDATION_MESSAGES: {
      ORDER_NUMBER_REQUIRED: 'Bitte Bestellnummer eingeben!',
      STATUS_REQUIRED: 'Bitte Bestellstatus auswählen!',
      PAYMENT_STATUS_REQUIRED: 'Bitte Zahlungsstatus auswählen!',
      CUSTOMER_NAME_REQUIRED: 'Bitte Kundennamen eingeben!',
      EMAIL_REQUIRED: 'Bitte E-Mail eingeben!',
      EMAIL_INVALID: 'Bitte gültige E-Mail eingeben!',
      PHONE_REQUIRED: 'Bitte Telefonnummer eingeben!',
      ADDRESS_REQUIRED: 'Bitte Adresse eingeben!',
      CITY_REQUIRED: 'Bitte Stadt eingeben!',
      STATE_REQUIRED: 'Bitte Bundesland eingeben!',
      ZIP_CODE_REQUIRED: 'Bitte Postleitzahl eingeben!',
      COUNTRY_REQUIRED: 'Bitte Land eingeben!',
    },

    ACTIONS: {
      ADD_ITEM: 'Artikel hinzufügen',
      REMOVE_ITEM: 'Artikel entfernen',
      CANCEL: 'Abbrechen',
      SAVE_CHANGES: 'Änderungen speichern',
    },

    MESSAGES: {
      NO_ITEMS: 'Keine Artikel in dieser Bestellung',
      ORDER_TOTAL: 'Bestellsumme',
    },

    DATE_FORMAT: 'DD.MM.YYYY HH:mm',
  },
};
