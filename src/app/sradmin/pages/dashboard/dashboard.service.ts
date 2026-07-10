import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface DashboardCardData {
  nbfc: {
    total: number;
  };
  receivable: {
    total: number;
    status: string;
  };
  paid: {
    total: number;
    status: string;
  };
  transactions: {
    total: number;
  };
}

export interface ChartData {
  category: string;
  value: number;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private readonly cardData: DashboardCardData = {
    nbfc: { total: 126 },
    receivable: { total: 187540000, status: 'Awaiting Collection' },
    paid: { total: 156380000, status: 'Successfully Settled' },
    transactions: { total: 124580 }
  };

  private readonly chartData: Record<string, ChartData[]> = {
    today: [
      { category: '08 AM', value: 60000 },
      { category: '09 AM', value: 80000 },
      { category: '10 AM', value: 58000 },
      { category: '11 AM', value: 92000 },
      { category: '12 PM', value: 45000 },
      { category: '01 PM', value: 75000 },
      { category: '02 PM', value: 110000 },
      { category: '03 PM', value: 90000 }
    ],
    week: [
      { category: 'Mon', value: 210000 },
      { category: 'Tue', value: 260000 },
      { category: 'Wed', value: 170000 },
      { category: 'Thu', value: 310000 },
      { category: 'Fri', value: 245000 },
      { category: 'Sat', value: 195000 },
      { category: 'Sun', value: 130000 }
    ],
    month: [
      { category: 'Week 1', value: 360000 },
      { category: 'Week 2', value: 410000 },
      { category: 'Week 3', value: 330000 },
      { category: 'Week 4', value: 420000 }
    ],
    year: [
      { category: 'Jan', value: 1130000 },
      { category: 'Feb', value: 1220000 },
      { category: 'Mar', value: 1310000 },
      { category: 'Apr', value: 1400000 },
      { category: 'May', value: 1470000 },
      { category: 'Jun', value: 1520000 },
      { category: 'Jul', value: 0 },
      { category: 'Aug', value: 0 },
      { category: 'Sep', value: 0 },
      { category: 'Oct', value: 0 },
      { category: 'Nov', value: 0 },
      { category: 'Dec', value: 0 }
    ]
  };

  constructor() {}

  public getDashboardData(): Observable<DashboardCardData> {
    return of(this.cardData);
  }

  public getChartData(period: string): Observable<ChartData[]> {
    return of(this.chartData[period] || []);
  }
}
