export interface DashboardData {
  visitors: {
    new: number;
    returning: number;
  };
  newSellers: {
    date: string;
    count: number;
  }[];
  newBuyers: {
    date: string;
    count: number;
  }[];
  activeOrders: {
    date: string;
    count: number;
  }[];
}

export interface DashboardProps {
  locale: string;
}

export interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  timeRange: string;
  onRefresh: () => void;
  onTimeRangeChange: (range: string) => void;
}
