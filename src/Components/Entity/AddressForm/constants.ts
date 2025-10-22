export const COUNTRIES = [
    { name: "Deutschland", countryIso2: "DE", countryIso3: "DEU" },
    { name: "United States", countryIso2: "US", countryIso3: "USA" },
    { name: "United Kingdom", countryIso2: "GB", countryIso3: "GBR" },
    { name: "France", countryIso2: "FR", countryIso3: "FRA" },
    { name: "Spain", countryIso2: "ES", countryIso3: "ESP" },
    { name: "Italy", countryIso2: "IT", countryIso3: "ITA" },
    { name: "Portugal", countryIso2: "PT", countryIso3: "PRT" },
    { name: "Netherlands", countryIso2: "NL", countryIso3: "NLD" },
    { name: "Belgium", countryIso2: "BE", countryIso3: "BEL" },
    { name: "Switzerland", countryIso2: "CH", countryIso3: "CHE" },
    { name: "Austria", countryIso2: "AT", countryIso3: "AUT" }
]

export const ADDRESS_FIELDS_NAMES = [
    "street",
    "houseNumber",
    "postalCode",
    "city",
    "state",
    "countryName",
    "countryIso2",
    "countryIso3",
    "location"
] as const
