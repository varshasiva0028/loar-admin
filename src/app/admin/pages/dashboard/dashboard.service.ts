import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface CardData {
  users: {
    total: number;
    male: number;
    female: number;
  };
  receivable: {
    total: number;
    status: string;
  };
  paid: {
    total: number;
    status: string;
  };
}

export interface ChartPeriodData {
  categories: string[];
  series: {
    name: string;
    data: number[];
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  // Mock data representing the dashboard metrics
  private readonly cardData: CardData = {
    users: { total: 1250, male: 720, female: 530 },
    receivable: { total: 875000, status: 'Pending Collection' },
    paid: { total: 645000, status: 'Successfully Paid' }
  };

  // Mock chart data representing transactions over different periods
  private readonly chartData = {
    today: {
      categories: ['09:00 AM', '12:00 PM', '03:00 PM', '06:00 PM', '09:00 PM'],
      series: [
        {
          name: 'Total Transaction',
          data: [60000, 80000, 58000, 92000, 45000]
        }
      ]
    },
    week: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      series: [
        {
          name: 'Total Transaction',
          data: [210000, 260000, 170000, 310000, 245000, 195000, 130000]
        }
      ]
    },
    month: {
      categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      series: [
        {
          name: 'Total Transaction',
          data: [360000, 410000, 330000, 420000]
        }
      ]
    },
    year: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      series: [
        {
          name: 'Total Transaction',
          data: [1130000, 1220000, 1310000, 1400000, 1470000, 1520000, 0, 0, 0, 0, 0, 0]
        }
      ]
    }
  };

  constructor() {}

  /**
   * Retrieves summary statistics cards data
   */
  public getCardData(): Observable<CardData> {
    return of(this.cardData);
  }

  /**
   * Retrieves chart transaction series & categories based on selected active period
   */
  public getChartData(period: 'today' | 'week' | 'month' | 'year'): Observable<ChartPeriodData> {
    return of(this.chartData[period]);
  }
}