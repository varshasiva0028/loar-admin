import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { NotificationDataService } from '../../pages/notification/notification-data';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar implements OnInit {
  public unreadNotificationsCount: number = 0;

  constructor(
    private notificationService: NotificationDataService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.notificationService.getUnreadCount().subscribe({
      next: (count: number) => {
        this.unreadNotificationsCount = count;
      },
      error: (err: any) => {
        console.error('Error fetching unread notification count:', err);
      }
    });
  }

  public onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/admin/login']);
  }
}