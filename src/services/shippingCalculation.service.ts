import { TruckLocationService, TruckLocation } from './truckLocation.service';
import { OrderCustomer } from '@/types/order.types';
import { TRUCK } from '@/resources/truck/truck.resources';

export interface ShippingCalculationResult {
  cost: number;
  estimatedDistance: number;
  estimatedDeliveryTime: string;
  calculationMethod: 'distance-based' | 'default';
}

export class ShippingCalculationService {
  private truckLocationService = new TruckLocationService();

  // Base shipping configuration
  private readonly BASE_RATE = 5.0; // Base shipping cost
  private readonly RATE_PER_MILE = 0.5; // Cost per mile
  private readonly SPEED_MPH = 35; // Average delivery speed in mph
  private readonly DEFAULT_SHIPPING = 10.0; // Default shipping when truck location not available

  // Calculate shipping cost based on truck location and customer address
  async calculateShipping(
    customer: OrderCustomer,
    orderValue?: number
  ): Promise<ShippingCalculationResult> {
    try {
      const truckLocation = await this.truckLocationService.getTruckLocation();

      if (!truckLocation) {
        return this.getDefaultShipping();
      }

      const distance = await this.calculateDistance(truckLocation, customer);
      const cost = this.calculateCostFromDistance(distance, orderValue);
      const deliveryTime = this.calculateDeliveryTime(distance);

      return {
        cost,
        estimatedDistance: distance,
        estimatedDeliveryTime: deliveryTime,
        calculationMethod: 'distance-based',
      };
    } catch (error) {
      console.error('Error calculating shipping:', error);
      return this.getDefaultShipping();
    }
  }

  // Calculate distance between truck location and customer (simplified calculation)
  private async calculateDistance(
    truckLocation: TruckLocation,
    customer: OrderCustomer
  ): Promise<number> {
    // In a real implementation, you would use a geocoding service (Google Maps, Mapbox, etc.)
    // For now, we'll use a simplified calculation based on postal codes and cities

    // If same city, short distance
    if (this.normalizeCityName(truckLocation.city) === this.normalizeCityName(customer.city)) {
      return Math.random() * 15 + 5; // 5-20 miles within same city
    }

    // If same state, medium distance
    if (this.isSameState(truckLocation, customer)) {
      return Math.random() * 100 + 50; // 50-150 miles within same state
    }

    // Different states, longer distance
    return Math.random() * 500 + 200; // 200-700 miles for different states
  }

  // Calculate shipping cost from distance
  private calculateCostFromDistance(distance: number, orderValue?: number): number {
    let cost = this.BASE_RATE + distance * this.RATE_PER_MILE;

    // Apply discounts for larger orders
    if (orderValue) {
      if (orderValue >= 200) {
        cost *= 0.8; // 20% discount for orders over $200
      } else if (orderValue >= 100) {
        cost *= 0.9; // 10% discount for orders over $100
      }
    }

    // Minimum shipping cost
    cost = Math.max(cost, 3.0);

    return Math.round(cost * 100) / 100; // Round to 2 decimal places
  }

  // Calculate estimated delivery time
  private calculateDeliveryTime(distance: number): string {
    const hours = distance / this.SPEED_MPH;

    if (hours < 1) {
      return TRUCK.SHIPPING.DELIVERY_TIMES.SAME_DAY;
    } else if (hours < 4) {
      return TRUCK.SHIPPING.DELIVERY_TIMES.TWO_TO_FOUR_HOURS;
    } else if (hours < 8) {
      return TRUCK.SHIPPING.DELIVERY_TIMES.FOUR_TO_EIGHT_HOURS;
    } else if (hours < 24) {
      return TRUCK.SHIPPING.DELIVERY_TIMES.NEXT_DAY;
    } else {
      const days = Math.ceil(hours / 8); // 8 hour delivery days
      return TRUCK.SHIPPING.DELIVERY_TIMES.BUSINESS_DAYS(days);
    }
  }

  // Get default shipping when truck location is not available
  private getDefaultShipping(): ShippingCalculationResult {
    return {
      cost: this.DEFAULT_SHIPPING,
      estimatedDistance: 0,
      estimatedDeliveryTime: TRUCK.SHIPPING.DELIVERY_TIMES.DEFAULT,
      calculationMethod: 'default',
    };
  }

  // Helper methods
  private normalizeCityName(city: string): string {
    return city
      .trim()
      .toLowerCase()
      .replace(/[^a-z]/g, '');
  }

  private isSameState(truckLocation: TruckLocation, customer: OrderCustomer): boolean {
    // In a real implementation, you would map postal codes to states
    // For now, we'll use a simplified approach
    const truckStateCode = this.getStateFromPostalCode(truckLocation.postalCode);
    return truckStateCode === customer.state?.toLowerCase();
  }

  private getStateFromPostalCode(postalCode: string): string {
    // Simplified postal code to state mapping
    // In production, use a proper postal code database
    const code = postalCode.replace(/[^0-9]/g, '');
    const firstDigit = parseInt(code.charAt(0));

    if (firstDigit >= 0 && firstDigit <= 1) return 'ny';
    if (firstDigit >= 2 && firstDigit <= 2) return 'nj';
    if (firstDigit >= 3 && firstDigit <= 3) return 'pa';
    if (firstDigit >= 4 && firstDigit <= 4) return 'ga';
    if (firstDigit >= 5 && firstDigit <= 5) return 'ia';
    if (firstDigit >= 6 && firstDigit <= 6) return 'il';
    if (firstDigit >= 7 && firstDigit <= 7) return 'tx';
    if (firstDigit >= 8 && firstDigit <= 8) return 'co';
    if (firstDigit >= 9 && firstDigit <= 9) return 'ca';

    return 'unknown';
  }

  // Check if shipping calculation is available
  async isShippingCalculationAvailable(): Promise<boolean> {
    return await this.truckLocationService.isTruckLocationConfigured();
  }
}
