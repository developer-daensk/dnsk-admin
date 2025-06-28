export const PRODUCT_VARIATION = {
  TITLE: 'Produktvariante',
  TABLE: {
    COLUMNS: {
      NAME: 'Name',
      DESCRIPTION: 'Beschreibung',
    },
    NO_RESULTS: 'Keine Ergebnisse.',
    TOTAL_ITEMS: (total: number) => `Gesamt ${total} Artikel`,
    ACTIONS: {
      ADD: 'Neu hinzufügen',
      EDIT: 'Bearbeiten',
      DELETE: 'Löschen',
      CANCEL: 'Abbrechen',
      DELETE_CONFIRM_TITLE: 'Produktvariante löschen',
      DELETE_CONFIRM_CONTENT:
        'Sind Sie sicher, dass Sie diese Produktvariante löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.',
      DELETE_SUCCESS: 'Produktvariante erfolgreich gelöscht',
    },
  },
  PAGINATION: {
    PAGE_SIZE_OPTIONS: ['10', '20', '50', '100'] as (string | number)[],
  },
  ERRORS: {
    FETCH_FAILED: 'Fehler beim Laden der Produktvariante',
    CREATE_FAILED: 'Fehler beim Erstellen der Produktvariante',
    UPDATE_FAILED: 'Fehler beim Aktualisieren der Produktvariante',
    DELETE_FAILED: 'Fehler beim Löschen der Produktvariante',
  },
  MODAL: {
    TITLE: 'Produktvariante hinzufügen',
    EDIT_TITLE: 'Produktvariante bearbeiten',
    SUCCESS: 'Produktvariante erfolgreich erstellt',
    EDIT_SUCCESS: 'Produktvariante erfolgreich aktualisiert',
    FIELDS: {
      NAME: {
        LABEL: 'Variantenname',
        PLACEHOLDER: 'Variantenname eingeben',
        REQUIRED: 'Bitte Variantennamen eingeben',
      },
      DESCRIPTION: {
        LABEL: 'Variantenbeschreibung',
        PLACEHOLDER: 'Variantenbeschreibung eingeben (optional)',
      },
      UI_TYPE: {
        LABEL: 'UI-Typ',
        REQUIRED: 'Bitte UI-Typ auswählen',
        OPTIONS: {
          BUTTON: 'Button',
          IMAGE_BUTTON: 'Bild-Button',
          CAPTIONED_BUTTON: 'Button mit Beschriftung',
          DROPDOWN: 'Dropdown',
        },
      },
      ITEMS: {
        NAME: {
          REQUIRED: 'Artikel-Name fehlt',
          PLACEHOLDER: 'Artikel-Name',
        },
        VALUE: {
          REQUIRED: 'Artikel-Wert fehlt',
          PLACEHOLDER: 'Artikel-Wert',
        },
        ADD_BUTTON: 'Artikel hinzufügen',
      },
    },
  },
} as const;
