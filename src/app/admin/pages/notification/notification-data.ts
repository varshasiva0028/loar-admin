import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface NotificationModel {
  id: string;
  title: string;
  description: string;
  category: 'Transactions' | 'Users' | 'System' | 'Security' | 'Reports';
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
      id: 'NTF0001',
      title: 'Loan Disbursal Approved',
      description: 'The loan request of ₹5,00,000 for User USR10001 has been approved and disbursed by Bajaj Finance.',
      category: 'Transactions',
      priority: 'High',
      isRead: false,
      timestamp: '2 min ago',
      icon: 'bi-check-circle-fill',
      color: 'success',
      isStarred: true
    },
    {
      id: 'NTF0002',
      title: 'New Payment Received',
      description: 'Received installment payment of ₹8,500 from Priya Patel (USR10002) via HDFC Credila.',
      category: 'Transactions',
      priority: 'Low',
      isRead: false,
      timestamp: '15 min ago',
      icon: 'bi-cash-stack',
      color: 'primary',
      isStarred: false
    },
    {
      id: 'NTF0003',
      title: 'New User Registered',
      description: 'Customer Anjali Nair (USR10010) successfully created an account and submitted KYC docs.',
      category: 'Users',
      priority: 'Medium',
      isRead: false,
      timestamp: '1 hour ago',
      icon: 'bi-person-plus-fill',
      color: 'info',
      isStarred: false
    },
    {
      id: 'NTF0004',
      title: 'Failed Login Attempt',
      description: 'Multiple failed login attempts detected for account admin@loanportal.com from IP 192.168.1.105.',
      category: 'Security',
      priority: 'High',
      isRead: false,
      timestamp: '2 hours ago',
      icon: 'bi-shield-exclamation',
      color: 'danger',
      isStarred: true
    },
    {
      id: 'NTF0005',
      title: 'System Backup Complete',
      description: 'Automated nightly database backup completed successfully and uploaded to secure cloud storage.',
      category: 'System',
      priority: 'Low',
      isRead: true,
      timestamp: '4 hours ago',
      icon: 'bi-hdd-network-fill',
      color: 'secondary',
      isStarred: false
    },
    {
      id: 'NTF0006',
      title: 'Monthly Analytics Generated',
      description: 'The monthly transaction & active borrower report for June 2026 is ready to view and download.',
      category: 'Reports',
      priority: 'Medium',
      isRead: false,
      timestamp: 'Today, 08:30 AM',
      icon: 'bi-file-earmark-bar-graph-fill',
      color: 'success',
      isStarred: false
    },
    {
      id: 'NTF0007',
      title: 'NBFC Sync Failure Warning',
      description: 'API connection sync timeout occurred with Tata Capital NBFC server. Attempting auto-reconnect.',
      category: 'System',
      priority: 'High',
      isRead: false,
      timestamp: 'Today, 06:15 AM',
      icon: 'bi-exclamation-triangle-fill',
      color: 'warning',
      isStarred: false
    },
    {
      id: 'NTF0008',
      title: 'Security Certificate Renewed',
      description: 'SSL/TLS production domain security certificate was renewed successfully. Valid till July 2027.',
      category: 'Security',
      priority: 'Low',
      isRead: true,
      timestamp: 'Yesterday, 09:30 PM',
      icon: 'bi-lock-fill',
      color: 'success',
      isStarred: false
    },
    {
      id: 'NTF0009',
      title: 'KYC Document Verification Required',
      description: 'User Amit Verma (USR10005) updated high-value income proof requiring manual auditor approval.',
      category: 'Users',
      priority: 'Medium',
      isRead: false,
      timestamp: 'Yesterday, 04:45 PM',
      icon: 'bi-file-earmark-person-fill',
      color: 'info',
      isStarred: true
    },
    {
      id: 'NTF0010',
      title: 'Transaction Threshold Exceeded',
      description: 'A transaction of ₹1,25,000 triggered an AML alert. High priority audit review is recommended.',
      category: 'Transactions',
      priority: 'High',
      isRead: true,
      timestamp: 'Yesterday, 02:00 PM',
      icon: 'bi-currency-exchange',
      color: 'danger',
      isStarred: false
    },
    {
      id: 'NTF0011',
      title: 'User Profile Deleted',
      description: 'Account profile USR09942 was deleted from active directories per customer request.',
      category: 'Users',
      priority: 'Low',
      isRead: true,
      timestamp: '2 days ago',
      icon: 'bi-person-x-fill',
      color: 'secondary',
      isStarred: false
    },
    {
      id: 'NTF0012',
      title: 'System Scheduled Maintenance',
      description: 'Scheduled maintenance will be performed on July 15th between 02:00 AM and 04:00 AM IST.',
      category: 'System',
      priority: 'Medium',
      isRead: true,
      timestamp: '3 days ago',
      icon: 'bi-clock-fill',
      color: 'warning',
      isStarred: false
    },
    {
      id: 'NTF0013',
      title: 'Weekly Performance Report',
      description: 'System load levels, transaction success rates, and active logs are compiled in Report #441.',
      category: 'Reports',
      priority: 'Low',
      isRead: true,
      timestamp: '4 days ago',
      icon: 'bi-file-earmark-text-fill',
      color: 'primary',
      isStarred: false
    },
    {
      id: 'NTF0014',
      title: 'Authorized IP Address Added',
      description: 'A new secure management IP address (203.0.113.195) has been whitelisted for administrator console access.',
      category: 'Security',
      priority: 'High',
      isRead: true,
      timestamp: '5 days ago',
      icon: 'bi-shield-check',
      color: 'danger',
      isStarred: false
    },
    {
      id: 'NTF0015',
      title: 'Interest Rate Configuration Updated',
      description: 'Base lending rate configs for HDFC Credila loan brackets updated from 8.5% to 8.75% per annum.',
      category: 'Transactions',
      priority: 'Medium',
      isRead: true,
      timestamp: '1 week ago',
      icon: 'bi-percent',
      color: 'warning',
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