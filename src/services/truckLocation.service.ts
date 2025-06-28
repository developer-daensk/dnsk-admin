export interface TruckLocation {
  postalCode: string;
  city: string;
  timestamp: string;
}

export class TruckLocationService {
  private readonly STORAGE_KEY = 'truck_location_data';

  // Save truck location to localStorage (in production, this would be an API call)
  async saveTruckLocation(location: Omit<TruckLocation, 'timestamp'>): Promise<TruckLocation> {
    const locationData: TruckLocation = {
      ...location,
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(locationData));
    return locationData;
  }

  // Retrieve saved truck location
  async getTruckLocation(): Promise<TruckLocation | null> {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (!stored) return null;

    try {
      return JSON.parse(stored) as TruckLocation;
    } catch (error) {
      console.error('Error parsing truck location data:', error);
      return null;
    }
  }

  // Check if truck location is configured
  async isTruckLocationConfigured(): Promise<boolean> {
    const location = await this.getTruckLocation();
    return location !== null;
  }

  // Clear truck location data
  async clearTruckLocation(): Promise<void> {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
