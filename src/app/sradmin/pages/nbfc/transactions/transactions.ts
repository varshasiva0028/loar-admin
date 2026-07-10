import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  Inject,
  PLATFORM_ID,
  ViewEncapsulation,
  ViewChild,
  ElementRef
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionsService, TransactionModel, ChartData } from './transactions.service';

@Component({
  selector: 'app-nbfc-transactions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transactions.html',
  styleUrl: './transactions.css',
  encapsulation: ViewEncapsulation.None
})
export class Transactions implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('transactionChart', { static: false }) transactionChart!: ElementRef;

  public transactions: TransactionModel[] = [];
  public searchQuery: string = '';
  public nbfcId: string = '';
  
  // View mode & chart properties
  public activeView: 'table' | 'graph' = 'table';
  public activePeriod: 'today' | 'week' | 'month' | 'year' = 'month';
  public chartData: ChartData[] = [];
  
  private chart: any = null;
  private readonly isBrowser: boolean;
  private scriptLoadedPromise: Promise<void> | null = null;
  private viewInitialized = false;

  // Dynamic transaction counts based on active period
  private readonly transactionCounts: Record<string, number> = {
    today: 10,
    week: 65,
    month: 280,
    year: 3450
  };

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private route: ActivatedRoute,
    private transactionsService: TransactionsService,
    private router: Router
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  public goBack(): void {
    this.router.navigate(['/sradmin/nbfc']);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.nbfcId = params.get('id') || '';
      this.loadTransactions();
      if (this.isBrowser) {
        this.scriptLoadedPromise = this.loadApexCharts();
      }
    });
  }

  ngAfterViewInit(): void {
    this.viewInitialized = true;
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  private loadTransactions(): void {
    if (!this.nbfcId) return;
    this.transactionsService.getTransactionsByNbfc(this.nbfcId).subscribe({
      next: (data) => {
        this.transactions = data;
      },
      error: (err) => {
        console.error('Error loading transactions:', err);
      }
    });
  }

  public onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchQuery = target.value;
    if (!this.nbfcId) return;

    this.transactionsService.searchTransactions(this.nbfcId, this.searchQuery).subscribe({
      next: (data) => {
        this.transactions = data;
      },
      error: (err) => {
        console.error('Error searching transactions:', err);
      }
    });
  }

  public getTransactionCount(): number {
    return this.transactionCounts[this.activePeriod];
  }

  public getStatusBadgeClass(status: TransactionModel['status']): string {
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

  public getAmountClass(type: TransactionModel['type']): string {
    return type === 'Credit'
      ? 'text-success fw-semibold'
      : 'text-danger fw-semibold';
  }

  // --- Graph / Chart Loading ---
  private loadApexCharts(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof window !== 'undefined' && (window as any).ApexCharts) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/apexcharts/dist/apexcharts.min.js';
      script.async = true;
      script.onload = () => resolve();
      script.onerror = (err: Event | string) => reject(err);
      document.head.appendChild(script);
    });
  }

  public loadChart(): void {
    if (!this.isBrowser || !this.viewInitialized) {
      return;
    }

    // Delay to let the template render the chart placeholder element via *ngIf
    setTimeout(() => {
      const chartElement = this.transactionChart?.nativeElement;
      if (!chartElement) {
        console.warn('Transaction chart element not found in DOM.');
        return;
      }

      const ApexChartsConstructor = typeof window !== 'undefined' ? (window as any).ApexCharts : null;
      if (!ApexChartsConstructor) {
        this.loadChart();
        return;
      }

      this.transactionsService.getChartData(this.nbfcId, this.activePeriod).subscribe({
        next: (data: ChartData[]) => {
          this.chartData = data;
          const categories = data.map(item => item.category);
          const seriesData = data.map(item => item.value);

          const options = {
            series: [
              {
                name: 'Total Transaction',
                data: seriesData
              }
            ],
            chart: {
              type: 'line',
              height: 320,
              toolbar: {
                show: false
              },
              zoom: {
                enabled: false
              },
              fontFamily: 'Inter, sans-serif'
            },
            colors: ['#198754'],
            dataLabels: {
              enabled: false
            },
            stroke: {
              curve: 'smooth',
              width: 4
            },
            xaxis: {
              categories: categories,
              axisBorder: {
                show: false
              },
              axisTicks: {
                show: false
              },
              labels: {
                style: {
                  colors: '#6c757d',
                  fontSize: '11px'
                }
              }
            },
            yaxis: {
              labels: {
                formatter: (value: number) =>
                  '₹' + value.toLocaleString('en-IN'),
                style: {
                  colors: '#6c757d',
                  fontSize: '11px'
                }
              }
            },
            grid: {
              borderColor: '#e9ecef',
              strokeDashArray: 4,
              xaxis: {
                lines: {
                  show: false
                }
              }
            },
            tooltip: {
              y: {
                formatter: (value: number) =>
                  '₹' + value.toLocaleString('en-IN')
              }
            },
            legend: {
              show: false
            }
          };

          if (this.chart) {
            this.chart.destroy();
          }
          this.chart = new ApexChartsConstructor(chartElement, options);
          this.chart.render();
        },
        error: (err: unknown) => {
          console.error('Error fetching chart data:', err);
        }
      });
    }, 50);
  }

  public setPeriod(period: 'today' | 'week' | 'month' | 'year'): void {
    this.activePeriod = period;
    this.loadChart();
  }

  public setView(view: 'table' | 'graph'): void {
    this.activeView = view;
    if (view === 'graph') {
      this.loadChart();
    }
  }
}
