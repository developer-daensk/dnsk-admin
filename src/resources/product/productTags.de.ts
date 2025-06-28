export const PRODUCT_TAGS = {
  TITLE: 'Produkt-Tags',
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
      DELETE_CONFIRM_TITLE: 'Produkt-Tag löschen',
      DELETE_CONFIRM_CONTENT:
        'Sind Sie sicher, dass Sie diesen Produkt-Tag löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.',
      DELETE_SUCCESS: 'Produkt-Tag erfolgreich gelöscht',
    },
  },
  PAGINATION: {
    PAGE_SIZE_OPTIONS: ['10', '20', '50', '100'] as (string | number)[],
  },
  ERRORS: {
    FETCH_FAILED: 'Fehler beim Laden der Produkt-Tags',
    CREATE_FAILED: 'Fehler beim Erstellen des Produkt-Tags',
    UPDATE_FAILED: 'Fehler beim Aktualisieren des Produkt-Tags',
    DELETE_FAILED: 'Fehler beim Löschen des Produkt-Tags',
  },
  MODAL: {
    TITLE: 'Produkt-Tag hinzufügen',
    EDIT_TITLE: 'Produkt-Tag bearbeiten',
    SUCCESS: 'Produkt-Tag erfolgreich erstellt',
    EDIT_SUCCESS: 'Produkt-Tag erfolgreich aktualisiert',
    FIELDS: {
      NAME: {
        LABEL: 'Tag-Name',
        PLACEHOLDER: 'Tag-Name eingeben',
        REQUIRED: 'Bitte Tag-Namen eingeben',
      },
      DESCRIPTION: {
        LABEL: 'Tag-Beschreibung',
        PLACEHOLDER: 'Tag-Beschreibung eingeben (optional)',
      },
    },
  },
} as const;
