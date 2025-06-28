import { API_BASE_URL } from '@/lib/constants';
import { Order } from '@/types/order.types';

export class OrdersService {
  private baseUrl = `${API_BASE_URL}orders`;

  async getAll(options?: { status?: Order['status'] }) {
    try {
      const queryParams = new URLSearchParams();

      if (options?.status) {
        queryParams.append('status', options.status);
      }

      const url = `${this.baseUrl}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }

      const data = await response.json();
      return { data: data as Order[] };
    } catch (error) {
      console.error('Error fetching orders:', error);
      return { data: this.getMockOrders() };
    }
  }

  async getById(id: string) {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`);

      if (!response.ok) {
        throw new Error('Failed to fetch order');
      }

      const data = await response.json();
      return { data: data as Order };
    } catch (error) {
      console.error('Error fetching order:', error);
      return { data: this.getMockOrders().find(order => order.id === id) };
    }
  }

  async updateStatus(id: string, status: Order['status']) {
    try {
      const response = await fetch(`${this.baseUrl}/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('Failed to update order status');
      }

      const data = await response.json();
      return { data: data as Order };
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  }

  async update(id: string, orderData: Partial<Order>) {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Failed to update order');
      }

      const data = await response.json();
      return { data: data as Order };
    } catch (error) {
      console.error('Error updating order:', error);
      throw error;
    }
  }

  // Mock data for development
  private getMockOrders(): Order[] {
    return [
      {
        id: '1',
        orderNumber: 'ORD-2024-001',
        customer: {
          id: '1',
          name: 'John Doe',
          email: 'john.doe@example.com',
          phone: '+1234567890',
          address: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'USA',
        },
        items: [
          {
            id: '1',
            productId: 'prod-1',
            productName: 'Product A',
            quantity: 2,
            unitPrice: 50,
            totalPrice: 100,
          },
          {
            id: '2',
            productId: 'prod-2',
            productName: 'Product B',
            quantity: 1,
            unitPrice: 75,
            totalPrice: 75,
          },
        ],
        status: 'pending',
        paymentStatus: 'paid',
        paymentMethod: 'credit_card',
        subtotal: 175,
        tax: 17.5,
        shipping: 10,
        total: 202.5,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '2',
        orderNumber: 'ORD-2024-002',
        customer: {
          id: '2',
          name: 'Jane Smith',
          email: 'jane.smith@example.com',
          phone: '+0987654321',
          address: '456 Oak Ave',
          city: 'Los Angeles',
          state: 'CA',
          zipCode: '90001',
          country: 'USA',
        },
        items: [
          {
            id: '3',
            productId: 'prod-3',
            productName: 'Product C',
            quantity: 3,
            unitPrice: 30,
            totalPrice: 90,
          },
        ],
        status: 'processing',
        paymentStatus: 'paid',
        paymentMethod: 'paypal',
        subtotal: 90,
        tax: 9,
        shipping: 15,
        total: 114,
        trackingNumber: 'TRACK123456',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        updatedAt: new Date(Date.now() - 86400000).toISOString(),
      },
      {
        id: '3',
        orderNumber: 'ORD-2024-003',
        customer: {
          id: '3',
          name: 'Bob Johnson',
          email: 'bob.johnson@example.com',
          phone: '+1122334455',
          address: '789 Pine Rd',
          city: 'Chicago',
          state: 'IL',
          zipCode: '60601',
          country: 'USA',
        },
        items: [
          {
            id: '4',
            productId: 'prod-1',
            productName: 'Product A',
            quantity: 1,
            unitPrice: 50,
            totalPrice: 50,
          },
        ],
        status: 'shipped',
        paymentStatus: 'paid',
        paymentMethod: 'bank_transfer',
        subtotal: 50,
        tax: 5,
        shipping: 8,
        total: 63,
        trackingNumber: 'TRACK789012',
        createdAt: new Date(Date.now() - 172800000).toISOString(),
        updatedAt: new Date(Date.now() - 86400000).toISOString(),
      },
    ];
  }
}
