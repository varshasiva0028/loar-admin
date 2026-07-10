import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface NotificationModel {
  id: number;
  title: string;
  description: string;
  isRead: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationDataService {

  private notifications: NotificationModel[] = [
    {
      id: 1,
      title: 'New NBFC Registered',
      description: 'HDFC Credila has been registered successfully.',
      isRead: false
    },
    {
      id: 2,
      title: 'Monthly Report Ready',
      description: 'The monthly report has been generated.',
      isRead: false
    },
    {
      id: 3,
      title: 'System Backup Completed',
      description: 'Database backup completed successfully.',
      isRead: true
    }
  ];

  private unreadCountSubject = new BehaviorSubject<number>(this.calculateUnread());

  constructor() {}

  private calculateUnread(): number {
    return this.notifications.filter(n => !n.isRead).length;
  }

  getNotifications(): Observable<NotificationModel[]> {
    return new BehaviorSubject([...this.notifications]).asObservable();
  }

  getUnreadCount(): Observable<number> {
    return this.unreadCountSubject.asObservable();
  }

  markAsRead(id: number): void {
    const notification = this.notifications.find(n => n.id === id);

    if (notification && !notification.isRead) {
      notification.isRead = true;
      this.unreadCountSubject.next(this.calculateUnread());
    }
  }

  markAllAsRead(): void {
    this.notifications.forEach(n => n.isRead = true);
    this.unreadCountSubject.next(this.calculateUnread());
  }

  clearAll(): void {
    this.notifications = [];
    this.unreadCountSubject.next(0);
  }
}