import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NotificationDataService,
  NotificationModel
} from './notification-data';
@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.html',
  styleUrl: './notification.css'
})
export class Notification implements OnInit {
  public notifications: NotificationModel[] = [];

  public totalCount: number = 0;
  public unreadCount: number = 0;
  public highPriorityCount: number = 0;
  public todayCount: number = 0;

  public activeTab: string = 'All';
  public searchQuery: string = '';

  public selectedNotification: NotificationModel | null = null;
  public isDetailsModalOpen: boolean = false;

  constructor(private notificationService: NotificationDataService) { }

  ngOnInit(): void {
    this.loadNotifications();
  }

  private loadNotifications(): void {
    this.notificationService.getNotifications().subscribe({
      next: (list) => {
        this.totalCount = list.length;
        this.unreadCount = list.filter(n => !n.isRead).length;
        this.highPriorityCount = list.filter(n => n.priority === 'High').length;
        this.todayCount = list.filter(n =>
          n.timestamp.includes('Today') ||
          n.timestamp.includes('ago')
        ).length;
      }
    });

    this.applyFilters();
  }

  public applyFilters(): void {
    this.notificationService.searchNotifications(this.searchQuery, this.activeTab).subscribe({
      next: (data) => {
        this.notifications = data;
      },
      error: (err) => {
        console.error('Error filtering notifications:', err);
      }
    });
  }

  public onTabChange(tab: string): void {
    this.activeTab = tab;
    this.applyFilters();
  }

  public onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchQuery = target.value;
    this.applyFilters();
  }

  public onMarkAsRead(id: string, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.notificationService.markAsRead(id).subscribe(() => {
      this.applyFilters();
    });
  }

  public onMarkAllAsRead(): void {
    this.notificationService.markAllAsRead().subscribe(() => {
      this.applyFilters();
    });
  }

  public onClearAll(): void {
    this.notificationService.clearAll().subscribe(() => {
      this.applyFilters();
    });
  }

  public onToggleStar(id: string, event: Event): void {
    event.stopPropagation();
    this.notificationService.toggleStar(id).subscribe(() => {
      this.applyFilters();
    });
  }

  public onViewDetails(notification: NotificationModel): void {
    this.selectedNotification = notification;
    this.isDetailsModalOpen = true;

    if (!notification.isRead) {
      this.onMarkAsRead(notification.id);
    }
  }

  public closeDetailsModal(): void {
    this.isDetailsModalOpen = false;
    this.selectedNotification = null;
  }

  public getCategoryIconClass(category: NotificationModel['category']): string {
    switch (category) {
      case 'Transactions':
        return 'bi-cash-stack';
      case 'Users':
        return 'bi-person-fill';
      case 'Security':
        return 'bi-shield-lock-fill';
      case 'System':
        return 'bi-cpu-fill';
      case 'Reports':
        return 'bi-file-earmark-bar-graph-fill';
      default:
        return 'bi-bell-fill';
    }
  }

  public getPriorityBadgeClass(priority: NotificationModel['priority']): string {
    switch (priority) {
      case 'High':
        return 'bg-danger text-white';
      case 'Medium':
        return 'bg-warning text-dark';
      case 'Low':
        return 'bg-success text-white';
      default:
        return 'bg-secondary text-white';
    }
  }
}