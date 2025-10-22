import { getDictionaryGenerator } from "@/Components/Entity/Locale/utils";

const en = {
  details: {
    userDetails: {
      title: "User Details",
      firstName: "First Name",
      firstNamePlaceholder: "Enter first name",
      profileName: "Profile Name",
      profileNamePlaceholder: "Enter profile name",
      role: "Role",
      rolePlaceholder: "Select role",
      email: "Email",
      emailPlaceholder: "Enter email address",
      phone: "Phone",
      phonePlaceholder: "Enter phone number",
      department: "Department",
      departmentPlaceholder: "Enter department",
      location: "Location",
      locationPlaceholder: "Enter location",
      roles: {
        admin: "Admin",
        manager: "Manager",
        employee: "Employee",
        customer: "Customer",
      },
    },
    companyData: {
      title: "Company Data",
      companyName: "Company Name",
      companyNamePlaceholder: "Enter company name",
      companyId: "Company ID",
      companyIdPlaceholder: "Enter company ID",
      companyPhone: "Company Phone",
      companyPhonePlaceholder: "Enter company phone number",
      companyFax: "Company Fax",
      companyFaxPlaceholder: "Enter company fax number",
      companyEmail: "Company Email",
      companyEmailPlaceholder: "Enter company email",
      address: "Address",
      addressPlaceholder: "Enter company address",
    },
    actions: {
      cancel: "Cancel",
      save: "Save",
    },
  },
};

const de = {
  details: {
    userDetails: {
      title: "Benutzerdetails",
      firstName: "Vorname",
      firstNamePlaceholder: "Vornamen eingeben",
      profileName: "Profilname",
      profileNamePlaceholder: "Profilnamen eingeben",
      role: "Rolle",
      rolePlaceholder: "Rolle auswählen",
      email: "E-Mail",
      emailPlaceholder: "E-Mail-Adresse eingeben",
      phone: "Telefon",
      phonePlaceholder: "Telefonnummer eingeben",
      department: "Abteilung",
      departmentPlaceholder: "Abteilung eingeben",
      location: "Standort",
      locationPlaceholder: "Standort eingeben",
      roles: {
        admin: "Administrator",
        manager: "Manager",
        employee: "Mitarbeiter",
        customer: "Kunde",
      },
    },
    companyData: {
      title: "Firmendaten",
      companyName: "Firmenname",
      companyNamePlaceholder: "Firmenname eingeben",
      companyId: "Firmen-ID",
      companyIdPlaceholder: "Firmen-ID eingeben",
      companyPhone: "Firmentelefon",
      companyPhonePlaceholder: "Firmentelefonnummer eingeben",
      companyFax: "Firmen-Fax",
      companyFaxPlaceholder: "Firmen-Faxnummer eingeben",
      companyEmail: "Firmen-E-Mail",
      companyEmailPlaceholder: "Firmen-E-Mail eingeben",
      address: "Adresse",
      addressPlaceholder: "Firmenadresse eingeben",
    },
    actions: {
      cancel: "Abbrechen",
      save: "Speichern",
    },
  },
};

export type iDictionary = typeof en;
export const getDictionary = getDictionaryGenerator<typeof en>({ en, de });
