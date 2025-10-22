import { appRoutes } from "@/lib/routes/appRoutes";
import { iLocale } from "@/Components/Entity/Locale/types";
import {
  Package,
  HomeIcon,
  Settings2Icon,
  Truck,
  UserRoundCog,
  Search,
  ContactIcon,
  UserIcon,
  TagIcon,
} from "lucide-react";
import { iDictionary } from "./i18n";
import { iNavItem } from "./types";

export const getMainNavItems = (
  dictionary: iDictionary,
  locale: iLocale
): iNavItem[] => [
  {
    title: dictionary.dashboard,
    href: appRoutes.dashboard.home(locale),
    icon: HomeIcon,
  },
  {
    title: dictionary.product.root,
    icon: Package,
    href: appRoutes.dashboard.product.search.root(locale),
    children: [
      {
        title: dictionary.product.search,
        icon: Search,
        href: appRoutes.dashboard.product.search.root(locale),
      },
      {
        title: dictionary.product.attributes,
        icon: Settings2Icon,
        href: appRoutes.dashboard.product.attributes(locale),
      },
      {
        title: dictionary.product.tags,
        icon: TagIcon,
        href: appRoutes.dashboard.product.tags(locale),
      },
      {
        title: dictionary.product.variations,
        icon: Settings2Icon,
        href: appRoutes.dashboard.product.variations(locale),
      },
    ],
  },
  {
    title: dictionary.orders,
    icon: Truck,
    href: appRoutes.dashboard.orders.root(locale),
  },
  {
    title: dictionary.userManagement,
    icon: UserRoundCog,
    href: appRoutes.dashboard.userManagement.overview(locale),
  },
  {
    title: dictionary.contactPersons,
    icon: ContactIcon,
    href: appRoutes.dashboard.contactPersons.root(locale),
    children: [
      {
        title: dictionary.contactPersons,
        icon: UserIcon,
        href: appRoutes.dashboard.contactPersons.root(locale),
      },
      {
        title: dictionary.contactPersonsCompanyFounders,
        icon: UserIcon,
        href: appRoutes.dashboard.contactPersons.companyFounders(locale),
      },
    ],
  },
];

export const getProfileMenuItems = (
  dictionary: iDictionary,
  locale: iLocale
): iNavItem[] => [
  {
    title: dictionary.settings,
    href: appRoutes.dashboard.settings(locale),
    icon: Settings2Icon,
  },
  {
    title: dictionary.profile,
    href: appRoutes.dashboard.profile(locale),
    icon: UserRoundCog,
  },
];
