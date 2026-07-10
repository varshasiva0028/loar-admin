import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface TransactionModel {
  userId: string;
  nbfcId: string;
  username: string;
  transactionId: string;
  amount: number;
  type: 'Credit' | 'Debit';
  nbfcName: string;
  transactionDate: string;
  status:
    | 'Success'
    | 'Initiated'
    | 'Processing'
    | 'Cancelled'
    | 'Rejected'
    | 'Refunded';
}

export interface ChartData {
  category: string;
  value: number;
}

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  private readonly mockTransactions: TransactionModel[] = [
    // NBFC001 - HDFC Credila
    {
      userId: 'U10001',
      nbfcId: 'NBFC001',
      username: 'Rahul Sharma',
      transactionId: 'TXN987654',
      amount: 5000,
      type: 'Credit',
      nbfcName: 'HDFC Credila',
      transactionDate: '09 Jul 2026 10:30 AM',
      status: 'Success'
    },
    {
      userId: 'U10002',
      nbfcId: 'NBFC001',
      username: 'Priya Patel',
      transactionId: 'TXN987655',
      amount: 8500,
      type: 'Debit',
      nbfcName: 'HDFC Credila',
      transactionDate: '09 Jul 2026 11:15 AM',
      status: 'Processing'
    },
    // NBFC002 - Bajaj Finance
    {
      userId: 'U10003',
      nbfcId: 'NBFC002',
      username: 'Arjun Reddy',
      transactionId: 'TXN987656',
      amount: 2000,
      type: 'Credit',
      nbfcName: 'Bajaj Finance',
      transactionDate: '09 Jul 2026 12:05 PM',
      status: 'Initiated'
    },
    {
      userId: 'U10004',
      nbfcId: 'NBFC002',
      username: 'Sneha Rao',
      transactionId: 'TXN987657',
      amount: 12000,
      type: 'Debit',
      nbfcName: 'Bajaj Finance',
      transactionDate: '08 Jul 2026 09:45 AM',
      status: 'Success'
    },
    // NBFC003 - Tata Capital
    {
      userId: 'U10005',
      nbfcId: 'NBFC003',
      username: 'Amit Verma',
      transactionId: 'TXN987658',
      amount: 125000,
      type: 'Credit',
      nbfcName: 'Tata Capital',
      transactionDate: '08 Jul 2026 02:30 PM',
      status: 'Success'
    },
    {
      userId: 'U10006',
      nbfcId: 'NBFC003',
      username: 'Deepika Sen',
      transactionId: 'TXN987659',
      amount: 4500,
      type: 'Debit',
      nbfcName: 'Tata Capital',
      transactionDate: '07 Jul 2026 04:15 PM',
      status: 'Cancelled'
    }
  ];

  private readonly chartData: Record<string, ChartData[]> = {
    today: [
      { category: '08 AM', value: 45000 },
      { category: '09 AM', value: 65000 },
      { category: '10 AM', value: 85000 },
      { category: '11 AM', value: 75000 },
      { category: '12 PM', value: 95000 },
      { category: '01 PM', value: 55000 },
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

  public getTransactionsByNbfc(nbfcId: string): Observable<TransactionModel[]> {
    const list = this.mockTransactions.filter(t => t.nbfcId === nbfcId);
    return of([...list]);
  }

  public searchTransactions(nbfcId: string, keyword: string): Observable<TransactionModel[]> {
    const list = this.mockTransactions.filter(t => t.nbfcId === nbfcId);
    if (!keyword || !keyword.trim()) {
      return of([...list]);
    }
    const search = keyword.toLowerCase().trim();
    const filtered = list.filter(t =>
      t.userId.toLowerCase().includes(search) ||
      t.username.toLowerCase().includes(search) ||
      t.transactionId.toLowerCase().includes(search) ||
      t.nbfcName.toLowerCase().includes(search)
    );
    return of(filtered);
  }

  public getChartData(nbfcId: string, period: string): Observable<ChartData[]> {
    // Return mock chart data (optionally customized by nbfcId, but standard mock data is fine)
    return of(this.chartData[period] || []);
  }
}
