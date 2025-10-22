import { buildRoute } from "./utils";
import { iLocale } from "@/Components/Entity/Locale/types";

/**
 * NOTICE: define pathnames with locale support
 */
export const appRoutes = {
  auth: {
    signIn: (locale: iLocale) => `/${locale}/auth/signin`,
    signOut: (locale: iLocale) => `/${locale}/auth/signout`,
    selectUserRole: (locale: iLocale) => `/${locale}/auth/select-user-role`,
    error: (locale: iLocale) => `/${locale}/auth/error`,
  },
  dashboard: {
    home: (locale: iLocale) => `/${locale}/dashboard`,
    product: {
      attributes: (locale: iLocale) =>
        `/${locale}/dashboard/product/attributes`,
      tags: (locale: iLocale) => `/${locale}/dashboard/product/tags`,
      variations: (locale: iLocale) =>
        `/${locale}/dashboard/product/variations`,
      search: {
        root: (locale: iLocale) => `/${locale}/dashboard/product/search`,
        price: {
          root: (locale: iLocale, productId: string) =>
            `/${locale}/dashboard/product/search/${productId}/price`,
        },
        listing: {
          root: (locale: iLocale, productId: string) =>
            `/${locale}/dashboard/product/search/${productId}/listing`,
          create: (locale: iLocale, productId: string) =>
            `/${locale}/dashboard/product/search/${productId}/listing/create`,
          final: (locale: iLocale, productId: string) =>
            `/${locale}/dashboard/product/search/${productId}/listing/final`,
        },
        detail: {
          root: (locale: iLocale, productId: string) =>
            `/${locale}/dashboard/product/search/${productId}/detail`,
          edit: (locale: iLocale, productId: string) =>
            `/${locale}/dashboard/product/search/${productId}/detail/edit`,
        },
        description: {
          root: (locale: iLocale, productId: string) =>
            `/${locale}/dashboard/product/search/${productId}/description`,
          edit: (locale: iLocale, productId: string) =>
            `/${locale}/dashboard/product/search/${productId}/description/edit`,
        },
        tags: {
          root: (locale: iLocale, productId: string) =>
            `/${locale}/dashboard/product/search/${productId}/tags`,
          edit: (locale: iLocale, productId: string) =>
            `/${locale}/dashboard/product/search/${productId}/tags/edit`,
        },
        variants: {
          root: (locale: iLocale, productId: string) =>
            `/${locale}/dashboard/product/search/${productId}/variants`,
          edit: {
            root: (locale: iLocale, productId: string) =>
              `/${locale}/dashboard/product/search/${productId}/variants/edit`,
            list: (locale: iLocale, productId: string) =>
              `/${locale}/dashboard/product/search/${productId}/variants/edit/list`,
            information: (locale: iLocale, productId: string) =>
              `/${locale}/dashboard/product/search/${productId}/variants/edit/information`,
          },
        },
        specifications: (locale: iLocale, productId: string) =>
          `/${locale}/dashboard/product/search/${productId}/specifications`,
      },
      variants: {
        root: (locale: iLocale, productId: string) =>
          `/${locale}/dashboard/product/search/${productId}/variants`,
        edit: {
          root: (locale: iLocale, productId: string) =>
            `/${locale}/dashboard/product/search/${productId}/variants/edit`,
          list: (locale: iLocale, productId: string) =>
            `/${locale}/dashboard/product/search/${productId}/variants/edit/list`,
          information: (locale: iLocale, productId: string) =>
            `/${locale}/dashboard/product/search/${productId}/variants/edit/information`,
        },
      },
      specifications: (locale: iLocale, productId: string) =>
        `/${locale}/dashboard/product/search/${productId}/specifications`,
      new: (locale: iLocale) => `/${locale}/dashboard/product/new`,
    },
    contactPersons: {
      root: (locale: iLocale) => `/${locale}/dashboard/contact-persons`,
      companyFounders: (locale: iLocale) =>
        `/${locale}/dashboard/contact-persons/company-founders`,
    },
    orders: {
      root: (locale: iLocale, tab?: string) =>
        buildRoute(`/${locale}/dashboard/orders`, {
          tab,
        }),
      edit: (locale: iLocale, orderId: string) =>
        buildRoute(`/${locale}/dashboard/orders/${orderId}/edit`, {}),
    },
    users: {
      create: (locale: iLocale) => `/${locale}/dashboard/users/create`,
      edit: {
        root: (locale: iLocale, userId: string) =>
          buildRoute(`/${locale}/dashboard/users/${userId}/edit`),
        details: (locale: iLocale, userId: string) =>
          buildRoute(`/${locale}/dashboard/users/${userId}/edit/details`),
        employees: (locale: iLocale, userId: string) =>
          buildRoute(`/${locale}/dashboard/users/${userId}/edit/employees`),
        location: (locale: iLocale, userId: string) =>
          buildRoute(`/${locale}/dashboard/users/${userId}/edit/location`),
        offerings: (locale: iLocale, userId: string) =>
          buildRoute(`/${locale}/dashboard/users/${userId}/edit/offerings`),
        orderHistory: (locale: iLocale, userId: string) =>
          buildRoute(`/${locale}/dashboard/users/${userId}/edit/order-history`),
        organizationalChart: (locale: iLocale, userId: string) =>
          buildRoute(
            `/${locale}/dashboard/users/${userId}/edit/organizational-chart`
          ),
        salesHistory: (locale: iLocale, userId: string) =>
          buildRoute(`/${locale}/dashboard/users/${userId}/edit/sales-history`),
      },
    },
    userManagement: {
      root: (locale: iLocale) =>
        buildRoute(`/${locale}/dashboard/user-management`),
      overview: (locale: iLocale) =>
        buildRoute(`/${locale}/dashboard/user-management/overview`),
      users: {
        root: (locale: iLocale) =>
          buildRoute(`/${locale}/dashboard/user-management/users`),
        create: (locale: iLocale) =>
          buildRoute(`/${locale}/dashboard/user-management/users/create`),
        edit: (locale: iLocale, userId: string) =>
          buildRoute(
            `/${locale}/dashboard/user-management/users/${userId}/edit`
          ),
      },
      products: (locale: iLocale) =>
        buildRoute(`/${locale}/dashboard/user-management/products`),
      locations: (locale: iLocale) =>
        buildRoute(`/${locale}/dashboard/user-management/locations`),
      orders: (locale: iLocale) =>
        buildRoute(`/${locale}/dashboard/user-management/orders`),
      logistics: (locale: iLocale) =>
        buildRoute(`/${locale}/dashboard/user-management/logistics`),
    },
    profile: (locale: iLocale) => `/${locale}/dashboard/profile`,
    settings: (locale: iLocale, tab?: string) =>
      buildRoute(`/${locale}/dashboard/settings`, {
        tab,
      }),
  },
};
