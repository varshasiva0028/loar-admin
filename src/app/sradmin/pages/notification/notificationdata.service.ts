import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface NotificationModel {
  id: string;
  title: string;
  description: string;
  category: 'Transactions' | 'Users' | 'System' | 'Security';
  priority: 'High' | 'Medium' | 'Low';
  isRead: boolean;
  timestamp: string;
  icon: string;
  color: string;
  isStarred?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationDataService {
  private notifications: NotificationModel[] = [
    {
      id: 'SRN0001',
      title: 'New NBFC Registered',
      description: 'Tata Capital Finance (NBFC004) has submitted registration credentials and profile info.',
      category: 'Users',
      priority: 'Medium',
      isRead: false,
      timestamp: '2 min ago',
      icon: 'bi-person-plus-fill',
      color: 'info',
      isStarred: true
    },
    {
      id: 'SRN0002',
      title: 'NBFC Approved',
      description: 'HDFC Credila NBFC has been approved by the platform auditor and is now active.',
      category: 'Users',
      priority: 'Low',
      isRead: false,
      timestamp: '15 min ago',
      icon: 'bi-check-circle-fill',
      color: 'success',
      isStarred: false
    },
    {
      id: 'SRN0003',
      title: 'NBFC Disabled',
      description: 'Bajaj Finance NBFC status was temporarily changed to Disabled due to license review.',
      category: 'Users',
      priority: 'High',
      isRead: false,
      timestamp: '1 hour ago',
      icon: 'bi-person-x-fill',
      color: 'danger',
      isStarred: false
    },
    {
      id: 'SRN0004',
      title: 'New Admin Created',
      description: 'A new administrator account for admin_hdfc was successfully created.',
      category: 'Users',
      priority: 'Low',
      isRead: false,
      timestamp: '2 hours ago',
      icon: 'bi-person-badge-fill',
      color: 'primary',
      isStarred: false
    },
    {
      id: 'SRN0005',
      title: 'Admin Deleted',
      description: 'Administrator account admin_bajaj has been terminated and deleted from databases.',
      category: 'Users',
      priority: 'Medium',
      isRead: true,
      timestamp: '4 hours ago',
      icon: 'bi-trash-fill',
      color: 'secondary',
      isStarred: false
    },
    {
      id: 'SRN0006',
      title: 'System Backup Completed',
      description: 'Automated full system and storage snapshot database backup completed successfully.',
      category: 'System',
      priority: 'Low',
      isRead: true,
      timestamp: 'Today, 08:30 AM',
      icon: 'bi-hdd-network-fill',
      color: 'secondary',
      isStarred: false
    },
    {
      id: 'SRN0007',
      title: 'Security Alert',
      description: 'SSL/TLS certificate expiration warning. Automatic renewal attempt scheduled.',
      category: 'Security',
      priority: 'High',
      isRead: false,
      timestamp: 'Today, 06:15 AM',
      icon: 'bi-shield-exclamation',
      color: 'warning',
      isStarred: true
    },
    {
      id: 'SRN0008',
      title: 'Monthly Revenue Report Generated',
      description: 'Platform transaction fee commissions and reports for June 2026 are generated.',
      category: 'Transactions',
      priority: 'Medium',
      isRead: false,
      timestamp: 'Yesterday, 09:30 PM',
      icon: 'bi-file-earmark-bar-graph-fill',
      color: 'success',
      isStarred: false
    },
    {
      id: 'SRN0009',
      title: 'Transaction Threshold Alert',
      description: 'Tata Capital transaction value exceeded limits. Verification recommended.',
      category: 'Transactions',
      priority: 'High',
      isRead: false,
      timestamp: 'Yesterday, 04:45 PM',
      icon: 'bi-currency-exchange',
      color: 'danger',
      isStarred: false
    },
    {
      id: 'SRN0010',
      title: 'Failed Login Attempt',
      description: 'Multiple failed login attempts detected for superadmin@loanportal.com from IP 192.168.1.10.',
      category: 'Security',
      priority: 'High',
      isRead: true,
      timestamp: 'Yesterday, 02:00 PM',
      icon: 'bi-lock-fill',
      color: 'danger',
      isStarred: false
    },
    {
      id: 'SRN0011',
      title: 'Database Maintenance Scheduled',
      description: 'Database index rebuild and cleanup is scheduled for next Sunday at 02:00 AM IST.',
      category: 'System',
      priority: 'Low',
      isRead: true,
      timestamp: '2 days ago',
      icon: 'bi-clock-fill',
      color: 'warning',
      isStarred: false
    },
    {
      id: 'SRN0012',
      title: 'Server Health Warning',
      description: 'High memory usage (89%) detected on Super Admin gateway servers.',
      category: 'System',
      priority: 'High',
      isRead: true,
      timestamp: '3 days ago',
      icon: 'bi-cpu-fill',
      color: 'warning',
      isStarred: false
    },
    {
      id: 'SRN0013',
      title: 'New Enterprise Subscription',
      description: 'HDFC Credila successfully renewed their Enterprise plan status for 12 months.',
      category: 'Transactions',
      priority: 'Medium',
      isRead: true,
      timestamp: '4 days ago',
      icon: 'bi-cash-stack',
      color: 'primary',
      isStarred: false
    },
    {
      id: 'SRN0014',
      title: 'Audit Report Generated',
      description: 'System audit trails for user access controls have been compiled and generated.',
      category: 'System',
      priority: 'Low',
      isRead: true,
      timestamp: '5 days ago',
      icon: 'bi-file-earmark-text-fill',
      color: 'primary',
      isStarred: false
    },
    {
      id: 'SRN0015',
      title: 'Password Changed Successfully',
      description: 'Super Admin credentials changed successfully from administrative console settings.',
      category: 'Security',
      priority: 'Low',
      isRead: true,
      timestamp: '1 week ago',
      icon: 'bi-shield-check',
      color: 'success',
      isStarred: false
    }
  ];

  private notificationsSubject = new BehaviorSubject<NotificationModel[]>(this.notifications);

  constructor() {}

  public getNotifications(): Observable<NotificationModel[]> {
    return this.notificationsSubject.asObservable();
  }

  public getUnreadCount(): Observable<number> {
    return this.notificationsSubject.pipe(
      map(list => list.filter(n => !n.isRead).length)
    );
  }

  public markAsRead(id: string): Observable<boolean> {
    const item = this.notifications.find(n => n.id === id);
    if (item) {
      item.isRead = true;
      this.notificationsSubject.next([...this.notifications]);
      return of(true);
    }
    return of(false);
  }

  public markAllAsRead(): Observable<boolean> {
    this.notifications.forEach(n => n.isRead = true);
    this.notificationsSubject.next([...this.notifications]);
    return of(true);
  }

  public clearAll(): Observable<boolean> {
    this.notifications = [];
    this.notificationsSubject.next([...this.notifications]);
    return of(true);
  }

  public toggleStar(id: string): Observable<boolean> {
    const item = this.notifications.find(n => n.id === id);
    if (item) {
      item.isStarred = !item.isStarred;
      this.notificationsSubject.next([...this.notifications]);
      return of(true);
    }
    return of(false);
  }

  public searchNotifications(keyword: string, activeTab: string): Observable<NotificationModel[]> {
    return this.getNotifications().pipe(
      map(list => {
        let filtered = list;
        
        if (activeTab !== 'All' && activeTab !== 'Unread') {
          filtered = filtered.filter(n => n.category.toLowerCase() === activeTab.toLowerCase());
        } else if (activeTab === 'Unread') {
          filtered = filtered.filter(n => !n.isRead);
        }

        if (keyword && keyword.trim() !== '') {
          const search = keyword.toLowerCase().trim();
          filtered = filtered.filter(n => 
            n.title.toLowerCase().includes(search) || 
            n.description.toLowerCase().includes(search)
          );
        }

        return filtered;
      })
    );
  }
}
