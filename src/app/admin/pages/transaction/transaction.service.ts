import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

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
}

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private readonly mockTransactions: TransactionModel[] = [
    {
      userId: 'U10001',
      username: 'Rahul Sharma',
      transactionId: 'TXN987654',
      amount: 5000,
      type: 'Credit',
      nbfcName: 'Bajaj Finance',
      transactionDate: '09 Jul 2026 10:30 AM',
      status: 'Success'
    },
    {
      userId: 'U10002',
      username: 'Priya Patel',
      transactionId: 'TXN987655',
      amount: 8500,
      type: 'Debit',
      nbfcName: 'HDFC Credila',
      transactionDate: '09 Jul 2026 11:15 AM',
      status: 'Processing'
    },
    {
      userId: 'U10003',
      username: 'Arjun Reddy',
      transactionId: 'TXN987656',
      amount: 2000,
      type: 'Credit',
      nbfcName: 'Tata Capital',
      transactionDate: '09 Jul 2026 12:05 PM',
      status: 'Initiated'
    },
    {
      userId: 'U10004',
      username: 'Sneha Rao',
      transactionId: 'TXN987657',
      amount: 12000,
      type: 'Debit',
      nbfcName: 'Mahindra Finance',
      transactionDate: '08 Jul 2026 09:45 AM',
      status: 'Success'
    },
    {
      userId: 'U10005',
      username: 'Amit Verma',
      transactionId: 'TXN987658',
      amount: 125000,
      type: 'Credit',
      nbfcName: 'Shriram Finance',
      transactionDate: '08 Jul 2026 02:30 PM',
      status: 'Success'
    },
    {
      userId: 'U10006',
      username: 'Deepika Sen',
      transactionId: 'TXN987659',
      amount: 4500,
      type: 'Debit',
      nbfcName: 'L&T Finance',
      transactionDate: '07 Jul 2026 04:15 PM',
      status: 'Cancelled'
    },
    {
      userId: 'U10007',
      username: 'Vikram Joshi',
      transactionId: 'TXN987660',
      amount: 15000,
      type: 'Credit',
      nbfcName: 'Aditya Birla Finance',
      transactionDate: '07 Jul 2026 06:00 PM',
      status: 'Rejected'
    },
    {
      userId: 'U10008',
      username: 'Neha Gupta',
      transactionId: 'TXN987661',
      amount: 3200,
      type: 'Debit',
      nbfcName: 'Muthoot Finance',
      transactionDate: '06 Jul 2026 10:00 AM',
      status: 'Refunded'
    },
    {
      userId: 'U10009',
      username: 'Rohan Das',
      transactionId: 'TXN987662',
      amount: 7500,
      type: 'Credit',
      nbfcName: 'Tata Capital',
      transactionDate: '06 Jul 2026 11:30 AM',
      status: 'Success'
    },
    {
      userId: 'U10010',
      username: 'Anjali Nair',
      transactionId: 'TXN987663',
      amount: 22000,
      type: 'Debit',
      nbfcName: 'Bajaj Finance',
      transactionDate: '05 Jul 2026 03:20 PM',
      status: 'Success'
    }
  ];

  constructor() {}

  getTransactions(): Observable<TransactionModel[]> {
    return of(this.mockTransactions);
  }

  searchTransactions(keyword: string): Observable<TransactionModel[]> {

    if (!keyword.trim()) {
      return of(this.mockTransactions);
    }

    const search = keyword.toLowerCase();

    const filtered = this.mockTransactions.filter(transaction =>
      transaction.userId.toLowerCase().includes(search) ||
      transaction.username.toLowerCase().includes(search) ||
      transaction.transactionId.toLowerCase().includes(search) ||
      transaction.nbfcName.toLowerCase().includes(search)
    );

    return of(filtered);
  }

}