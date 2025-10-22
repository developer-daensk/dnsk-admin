export interface iCountry {
    value: string
    label: string
    countryIso2: string
    countryIso3: string
}

export interface iAddress {
    name: string | null
    countryName: string | null
    countryIso2: string | null
    countryIso3: string | null
    state: string | null
    city: string | null
    postalCode: string | null
    street: string | null
    houseNumber: string | null
    location: iLocation | null
}

export interface iLocation {
    longitude: number
    latitude: number
}
