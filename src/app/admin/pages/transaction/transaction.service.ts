import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface TransactionModel {
  userId: string;
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
<<<<<<< HEAD
  mode: 'UPI' | 'Credit Card' | 'Debit Card' | 'Net Banking' | 'Wallet' | 'Cash' ;
=======
  mode: 'UPI' | 'Credit Card' | 'Debit Card' | 'Net Banking' | 'Wallet' | 'Cash';
  phoneNumber: string;
>>>>>>> 1bc09b0 (Transaction Completed)
}

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

<<<<<<< HEAD
  private readonly mockTransactions: TransactionModel[] = [
    {
      userId: 'U10001',
      username: 'Rahul Sharma',
      transactionId: 'TXN987654',
      amount: 5000,
      type: 'Credit',
      nbfcName: 'Bajaj Finance',
      transactionDate: '09 Jul 2026 10:30 AM',
      status: 'Success',
      mode: 'UPI'
    },
    {
      userId: 'U10002',
      username: 'Priya Patel',
      transactionId: 'TXN987655',
      amount: 8500,
      type: 'Debit',
      nbfcName: 'HDFC Credila',
      transactionDate: '09 Jul 2026 11:15 AM',
      status: 'Processing',
      mode: 'Credit Card'
    },
    {
      userId: 'U10003',
      username: 'Arjun Reddy',
      transactionId: 'TXN987656',
      amount: 2000,
      type: 'Credit',
      nbfcName: 'Tata Capital',
      transactionDate: '09 Jul 2026 12:05 PM',
      status: 'Initiated',
      mode: 'Debit Card'
    },
    {
      userId: 'U10004',
      username: 'Sneha Rao',
      transactionId: 'TXN987657',
      amount: 12000,
      type: 'Debit',
      nbfcName: 'Mahindra Finance',
      transactionDate: '08 Jul 2026 09:45 AM',
      status: 'Success',
      mode: 'Net Banking'
    },
    {
      userId: 'U10005',
      username: 'Amit Verma',
      transactionId: 'TXN987658',
      amount: 125000,
      type: 'Credit',
      nbfcName: 'Shriram Finance',
      transactionDate: '08 Jul 2026 02:30 PM',
      status: 'Success',
      mode: 'Wallet'
    },
    {
      userId: 'U10006',
      username: 'Deepika Sen',
      transactionId: 'TXN987659',
      amount: 4500,
      type: 'Debit',
      nbfcName: 'L&T Finance',
      transactionDate: '07 Jul 2026 04:15 PM',
      status: 'Cancelled',
      mode: 'Cash'
    },
    {
      userId: 'U10007',
      username: 'Vikram Joshi',
      transactionId: 'TXN987660',
      amount: 15000,
      type: 'Credit',
      nbfcName: 'Aditya Birla Finance',
      transactionDate: '07 Jul 2026 06:00 PM',
      status: 'Rejected',
      mode: 'Net Banking'
    },
    {
      userId: 'U10008',
      username: 'Neha Gupta',
      transactionId: 'TXN987661',
      amount: 3200,
      type: 'Debit',
      nbfcName: 'Muthoot Finance',
      transactionDate: '06 Jul 2026 10:00 AM',
      status: 'Refunded',
      mode: 'Net Banking'
    },
    {
      userId: 'U10009',
      username: 'Rohan Das',
      transactionId: 'TXN987662',
      amount: 7500,
      type: 'Credit',
      nbfcName: 'Tata Capital',
      transactionDate: '06 Jul 2026 11:30 AM',
      status: 'Success',
      mode: 'Net Banking'
    },
    {
      userId: 'U10010',
      username: 'Anjali Nair',
      transactionId: 'TXN987663',
      amount: 22000,
      type: 'Debit',
      nbfcName: 'Bajaj Finance',
      transactionDate: '05 Jul 2026 03:20 PM',
      status: 'Success',
      mode: 'UPI'
    }
  ];
=======
  private apiUrl = 'http://tst1.loomkji.in/loarphp/agettrs.php';
>>>>>>> 1bc09b0 (Transaction Completed)

  constructor(private http: HttpClient) {}

  getTransactions(): Observable<TransactionModel[]> {
    console.log('Service: fetching from API:', this.apiUrl);
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => {
        console.log('Service: API response raw data:', response);
        if (!response || !response.data || !response.data.trns) {
          console.warn('Service: API returned empty or invalid structure!');
          return [];
        }
        const mapped = response.data.trns.map((item: any, index: number) => {
          return {
            userId: item.cphno ? `USR${item.cphno.substring(6)}` : `USR${index.toString().padStart(5, '0')}`,
            username: (item.name || '').trim(),
            transactionId: item.tid || '',
            amount: Number(item.amt) || 0,
            type: (index % 2 === 0) ? 'Credit' : 'Debit',
            nbfcName: 'Loomkji Finance',
            transactionDate: item.trdt || '',
            status: this.mapStatus(item.stat),
            mode: this.mapMode(item.trmd),
            phoneNumber: item.cphno || ''
          } as TransactionModel;
        });
        console.log('Service: Mapped transactions list:', mapped);
        return mapped;
      })
    );
  }

  searchTransactions(keyword: string): Observable<TransactionModel[]> {
    return this.getTransactions().pipe(
      map(transactions => {
        if (!keyword.trim()) {
          return transactions;
        }
        const search = keyword.toLowerCase();
        return transactions.filter(transaction =>
          transaction.userId.toLowerCase().includes(search) ||
          transaction.username.toLowerCase().includes(search) ||
          transaction.transactionId.toLowerCase().includes(search)
        );
      })
    );
  }

  private mapStatus(stat: string): TransactionModel['status'] {
    switch (stat) {
      case '1':
        return 'Initiated';
      case '2':
        return 'Processing';
      case '3':
        return 'Refunded';
      case '4':
        return 'Cancelled';
      case '5':
        return 'Rejected';
      case '6':
      default:
        return 'Success';
    }
  }

  private mapMode(mode: string): TransactionModel['mode'] {
    const cleanMode = (mode || '').toLowerCase().trim();
    if (cleanMode === 'upi') return 'UPI';
    if (cleanMode === 'credit card' || cleanMode === 'credit_card' || cleanMode === 'card') return 'Credit Card';
    if (cleanMode === 'debit card' || cleanMode === 'debit_card') return 'Debit Card';
    if (cleanMode === 'net banking' || cleanMode === 'net_banking' || cleanMode === 'netbanking') return 'Net Banking';
    if (cleanMode === 'wallet') return 'Wallet';
    if (cleanMode === 'cash') return 'Cash';
    return 'UPI';
  }
}