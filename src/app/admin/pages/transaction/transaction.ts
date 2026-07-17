import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  TransactionService,
  TransactionModel
} from './transaction.service';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction.html',
  styleUrl: './transaction.css'
})
export class Transaction implements OnInit {

  public transactions: TransactionModel[] = [];
  public searchQuery: string = '';

  public selectedTransaction: TransactionModel | null = null;
  public isDetailsModalOpen = false;

  public onViewTransaction(txn: TransactionModel): void {
    this.selectedTransaction = txn;
    this.isDetailsModalOpen = true;
  }

  public closeDetailsModal(): void {
    this.isDetailsModalOpen = false;
    this.selectedTransaction = null;
  }

  constructor(
    private transactionService: TransactionService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadTransactions();
  }

 public loadTransactions(): void {
  console.log('Component: loadTransactions() started');
  this.transactionService.getTransactions().subscribe({
    next: (data: TransactionModel[]) => {
      console.log("Component: API successfully returned transactions:", data);
      this.transactions = data;
      this.cdr.detectChanges();
    },
    error: (err: unknown) => {
      console.error('Component: Error fetching transactions:', err);
    }
  });
}

  public onSearch(event: Event): void {

    const target = event.target as HTMLInputElement;

    this.searchQuery = target.value;

    this.transactionService.searchTransactions(this.searchQuery).subscribe({

      next: (data: TransactionModel[]) => {
        this.transactions = data;
        this.cdr.detectChanges();
      },

      error: (err: unknown) => {
        console.error('Error searching transactions:', err);
      }

    });

  }

  public getStatusBadgeClass(
    status: TransactionModel['status']
  ): string {

    switch (status) {

      case 'Success':
        return 'bg-success text-white';

      case 'Initiated':
        return 'bg-primary text-white';

      case 'Processing':
        return 'bg-warning text-dark';

      case 'Cancelled':
        return 'bg-secondary text-white';

      case 'Rejected':
        return 'bg-danger text-white';

      case 'Refunded':
        return 'bg-info text-dark';

      default:
        return 'bg-dark text-white';

    }

  }

  public getAmountClass(
    type: TransactionModel['type']
  ): string {

    return type === 'Credit'
      ? 'text-success fw-semibold'
      : 'text-danger fw-semibold';

  }

}