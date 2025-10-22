import { iAddress } from "./types"

/**
 * Formats an address object into a human-readable string.
 * For German addresses, standard format is: Street HouseNumber PostalCode City State Country
 * @param address - The address object to format.
 * @returns A formatted string representation of the address.
 */
export function getAddressLabel(address?: iAddress, ignoreCountryName: boolean = true): string {
    if (!address) return ""

    const streetLine = [address?.street, address?.houseNumber].filter(Boolean).join(" ")
    const cityLine = [address?.postalCode, address?.city].filter(Boolean).join(" ")
    return [
        streetLine,
        cityLine,
        address?.state,
        ignoreCountryName ? undefined : address?.countryName
    ]
        .filter(Boolean)
        .join(", ")
}
