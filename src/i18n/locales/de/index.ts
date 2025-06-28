// Import German resources
import { common } from '../../../resources/categories/common.de';
import { navigation } from '../../../resources/categories/navigation.de';
import { forms } from '../../../resources/categories/forms.de';
import { messages } from '../../../resources/categories/messages.de';
import { errors } from '../../../resources/categories/errors.de';
import { authResources } from '../../../resources/auth.resources.de';
import { textResources as chartResources } from '../../../resources/chart.resource.de';
import { MENU_ITEMS } from '../../../resources/layout/menuItems.de';
import { TRUCK } from '../../../resources/truck/truck.resources.de';
import { USER_MANAGEMENT } from '../../../resources/management/userManagement.de';
import { ORDERS } from '../../../resources/orders/orders.resources.de';
import { PRODUCT } from '../../../resources/product/product.de';
import { PRODUCT_ATTRIBUTES } from '../../../resources/product/productAttributes.de';
import { PRODUCT_TAGS } from '../../../resources/product/productTags.de';
import { PRODUCT_VARIATION } from '../../../resources/product/productVariation.de';
import { errorMessages } from '../../../resources/errorMessages.de';

export default {
  // Basic i18n categories
  common,
  navigation,
  forms,
  messages,
  errors,

  // Language specific
  language: {
    title: 'Sprache',
    english: 'English',
    german: 'Deutsch',
    spanish: 'Español',
    switchLanguage: 'Sprache wechseln',
  },

  // Dashboard
  dashboard: {
    title: 'Dashboard',
    overview: 'Übersicht',
    statistics: 'Statistiken',
    recentActivity: 'Letzte Aktivitäten',
    quickActions: 'Schnellaktionen',
  },

  // Products
  products: {
    title: 'Produkte',
    addProduct: 'Produkt hinzufügen',
    editProduct: 'Produkt bearbeiten',
    deleteProduct: 'Produkt löschen',
    productName: 'Produktname',
    productDescription: 'Produktbeschreibung',
    price: 'Preis',
    stock: 'Lagerbestand',
    category: 'Kategorie',
    status: 'Status',
    active: 'Aktiv',
    inactive: 'Inaktiv',
  },

  // Orders
  orders: {
    title: 'Bestellungen',
    orderNumber: 'Bestellnummer',
    customer: 'Kunde',
    date: 'Datum',
    total: 'Gesamt',
    status: 'Status',
    pending: 'Ausstehend',
    processing: 'In Bearbeitung',
    shipped: 'Versendet',
    delivered: 'Geliefert',
    cancelled: 'Storniert',
    viewDetails: 'Details anzeigen',
  },

  // Users
  users: {
    title: 'Benutzerverwaltung',
    addUser: 'Benutzer hinzufügen',
    editUser: 'Benutzer bearbeiten',
    deleteUser: 'Benutzer löschen',
    userName: 'Benutzername',
    userEmail: 'Benutzer E-Mail',
    userRole: 'Benutzerrolle',
    lastLogin: 'Letzte Anmeldung',
    userStatus: 'Benutzerstatus',
  },

  // Theme
  theme: {
    lightMode: 'Wechseln Sie zum Lichtmodus',
    darkMode: 'Wechseln Sie zum Dunkelmodus',
  },

  // Complete resource objects
  auth: authResources,
  chart: chartResources,
  menuItems: MENU_ITEMS,
  truck: TRUCK,
  userManagement: USER_MANAGEMENT,
  ordersManagement: ORDERS,
  product: PRODUCT,
  productAttributes: PRODUCT_ATTRIBUTES,
  productTags: PRODUCT_TAGS,
  productVariation: PRODUCT_VARIATION,
  errorMessages,
};
