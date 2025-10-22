"use client"

import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { useEffect, useState } from "react"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import { iAddress } from "../AddressForm/types"
import "./styles.css"

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png"
})

interface MapProps {
    address: iAddress
    name: string
    height?: string
}

export default function Map({ address, name, height }: MapProps) {
    const [position, setPosition] = useState<[number, number]>([51.505, -0.09]) // Default position
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const geocodeAddress = async () => {
            try {
                // If we have location data, use it directly
                if (address.location?.latitude && address.location?.longitude) {
                    setPosition([address.location.latitude, address.location.longitude])
                    setIsLoading(false)
                    return
                }

                // Otherwise, geocode the address
                const addressParts = [
                    address.street,
                    address.houseNumber,
                    address.postalCode,
                    address.city
                ].filter(Boolean)

                if (addressParts.length === 0) {
                    setIsLoading(false)
                    return
                }

                const fullAddress = addressParts.join(", ")
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullAddress)}&limit=1`
                )
                const data = await response.json()

                if (data && data.length > 0) {
                    setPosition([parseFloat(data[0].lat), parseFloat(data[0].lon)])
                }
            } catch (error) {
                console.error("Error geocoding address:", error)
            } finally {
                setIsLoading(false)
            }
        }

        geocodeAddress()
    }, [address])

    if (isLoading) {
        return (
            <div
                className={`flex h-[${height ? height : "64"}] w-full animate-pulse items-center justify-center rounded-lg bg-gray-200`}
            >
                <span className="text-gray-500">Loading map...</span>
            </div>
        )
    }

    return (
        <div className={`h-[${height ? height : "64"}] w-full overflow-hidden rounded-lg border`}>
            <MapContainer
                center={position}
                zoom={15}
                style={{ height: height ? height : "100%", width: "100%" }}
                className="z-0"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>
                        <div className="text-center">
                            <strong>{name}</strong>
                            <br />
                            {[address.street, address.houseNumber].filter(Boolean).join(" ")}
                            <br />
                            {[address.postalCode, address.city].filter(Boolean).join(" ")}
                        </div>
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}
