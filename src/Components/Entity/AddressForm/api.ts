import { iAddress } from "./types"
import { getAddressLabel } from "./utils"

export async function fetchAddresses(query: string): Promise<iAddress[]> {
    const addresses: iAddress[] = [
        {
            name: "Berliner Hauptbüro",
            countryName: "Deutschland",
            countryIso2: "DE",
            countryIso3: "DEU",
            state: "Berlin",
            city: "Berlin",
            postalCode: "10115",
            street: "Friedrichstraße",
            houseNumber: "123",
            location: { latitude: 52.520008, longitude: 13.404954 }
        },
        {
            name: "Münchner Niederlassung",
            countryName: "Deutschland",
            countryIso2: "DE",
            countryIso3: "DEU",
            state: "Bayern",
            city: "München",
            postalCode: "80331",
            street: "Karlsplatz",
            houseNumber: "1",
            location: { latitude: 48.137154, longitude: 11.575538 }
        },
        {
            name: "Hamburger Filiale",
            countryName: "Deutschland",
            countryIso2: "DE",
            countryIso3: "DEU",
            state: "Hamburg",
            city: "Hamburg",
            postalCode: "20095",
            street: "Mönckebergstraße",
            houseNumber: "7",
            location: { latitude: 53.551086, longitude: 9.993682 }
        },
        {
            name: "Frankfurt Bürokomplex",
            countryName: "Deutschland",
            countryIso2: "DE",
            countryIso3: "DEU",
            state: "Hessen",
            city: "Frankfurt",
            postalCode: "60313",
            street: "Zeil",
            houseNumber: "26",
            location: { latitude: 50.110924, longitude: 8.682127 }
        }
    ]
    return new Promise(resolve => {
        setTimeout(() => {
            const filtered = addresses.filter(addr =>
                getAddressLabel(addr).toLowerCase().includes(query.toLowerCase())
            )
            resolve(filtered)
        }, 700) // Simulate network delay
    })
}
