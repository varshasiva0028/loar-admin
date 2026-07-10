import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  Inject,
  PLATFORM_ID,
  ViewEncapsulation
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { DashboardService, CardData, ChartPeriodData } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  encapsulation: ViewEncapsulation.None
})
export class Dashboard implements OnInit, AfterViewInit, OnDestroy {

  formattedDate: string = '';
  activePeriod: 'today' | 'week' | 'month' | 'year' = 'month';
  cardData: CardData | null = null;

  // Dynamic transaction counts based on active period
  private readonly transactionCounts = {
    today: 45,
    week: 280,
    month: 1250,
    year: 14850
  };

  private chart: any = null;
  private readonly isBrowser: boolean;
  private scriptLoadedPromise: Promise<void> | null = null;
  private viewInitialized = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private dashboardService: DashboardService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.updateDate();
    this.loadStatistics();
    if (this.isBrowser) {
      this.scriptLoadedPromise = this.loadApexCharts();
    }
  }

  ngAfterViewInit(): void {
    this.viewInitialized = true;
    if (this.isBrowser && this.scriptLoadedPromise) {
      this.scriptLoadedPromise
        .then(() => {
          setTimeout(() => this.initChart(), 100);
        })
        .catch((err: unknown) => {
          console.error('Failed to load ApexCharts:', err);
        });
    }
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  private updateDate(): void {
    const today = new Date();
    this.formattedDate = today.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }

  public getTransactionCount(): number {
    return this.transactionCounts[this.activePeriod];
  }

  private loadStatistics(): void {
    this.dashboardService.getCardData().subscribe({
      next: (data: CardData) => {
        this.cardData = data;
      },
      error: (err: unknown) => {
        console.error('Error fetching statistics:', err);
      }
    });
  }

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

  private initChart(): void {
    if (!this.viewInitialized) {
      return;
    }
    const chartElement = document.querySelector('#transaction-chart');
    if (!chartElement) {
      console.warn('Transaction chart element not found in DOM.');
      return;
    }

    // Safely check window for ApexCharts constructor without referencing bare variable to avoid ReferenceError
    const ApexChartsConstructor = typeof window !== 'undefined' ? (window as any).ApexCharts : null;
    if (!ApexChartsConstructor) {
      // Retry in 50ms if script load is complete but window property is not initialized yet
      setTimeout(() => this.initChart(), 50);
      return;
    }

    this.dashboardService.getChartData(this.activePeriod).subscribe({
      next: (currentData: ChartPeriodData) => {
        const options = {
          series: currentData.series,
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
            categories: currentData.categories,
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
  }

  setPeriod(period: 'today' | 'week' | 'month' | 'year'): void {
    this.activePeriod = period;
    if (!this.chart) {
      return;
    }
    this.dashboardService.getChartData(period).subscribe({
      next: (currentData: ChartPeriodData) => {
        this.chart.updateOptions({
          xaxis: {
            categories: currentData.categories
          },
          series: currentData.series
        });
      },
      error: (err: unknown) => {
        console.error('Error updating chart:', err);
      }
    });
  }
}