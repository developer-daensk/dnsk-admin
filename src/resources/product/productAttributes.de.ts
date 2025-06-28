export const PRODUCT_ATTRIBUTES = {
  TITLE: 'Produktattribute',
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
      DELETE_CONFIRM_TITLE: 'Produktattribut löschen',
      DELETE_CONFIRM_CONTENT:
        'Sind Sie sicher, dass Sie dieses Produktattribut löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.',
      DELETE_SUCCESS: 'Produktattribut erfolgreich gelöscht',
    },
  },
  PAGINATION: {
    PAGE_SIZE_OPTIONS: ['10', '20', '50', '100'] as (string | number)[],
  },
  ERRORS: {
    FETCH_FAILED: 'Fehler beim Laden der Produktattribute',
    CREATE_FAILED: 'Fehler beim Erstellen des Produktattributs',
    UPDATE_FAILED: 'Fehler beim Aktualisieren des Produktattributs',
    DELETE_FAILED: 'Fehler beim Löschen des Produktattributs',
  },
  TOAST: {
    ADD_SUCCESS: 'Produktattribut erfolgreich hinzugefügt!',
    ADD_FAILED: 'Fehler beim Hinzufügen des Produktattributs.',
    EDIT_SUCCESS: 'Produktattribut erfolgreich aktualisiert!',
    EDIT_FAILED: 'Fehler beim Aktualisieren des Produktattributs.',
    DELETE_SUCCESS: 'Produktattribut erfolgreich gelöscht',
  },
  MODAL: {
    TITLE: 'Produktattribut',
    ACTIONS: {
      SAVE: 'Speichern',
      CANCEL: 'Abbrechen',
    },
    FIELDS: {
      NAME: {
        LABEL: 'Attributname',
        PLACEHOLDER: 'Attributname eingeben',
        REQUIRED: 'Bitte Attributnamen eingeben',
      },
      DESCRIPTION: {
        LABEL: 'Attributbeschreibung',
        PLACEHOLDER: 'z.B. Produktfarbe',
      },
    },
  },
} as const;
