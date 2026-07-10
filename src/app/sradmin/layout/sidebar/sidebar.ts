import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NotificationDataService } from '../../pages/notification/notificationdata';@Component({
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

  constructor(private notificationService: NotificationDataService) {}

  ngOnInit(): void {
    this.notificationService.getUnreadCount().subscribe({
      next: (count) => {
        this.unreadNotificationsCount = count;
      },
      error: (err) => {
        console.error('Error fetching unread notification count:', err);
      }
    });
  }
}