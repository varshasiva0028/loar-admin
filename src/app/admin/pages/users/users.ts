import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService, UserModel } from './users.service';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class Users implements OnInit {
  public users: UserModel[] = [];
  public searchQuery: string = '';

  // Modal states
  public selectedUser: UserModel | null = null;
  public isViewModalOpen: boolean = false;
  public isDeleteModalOpen: boolean = false;
  public userToDelete: UserModel | null = null;

  constructor(private usersService: UsersService,private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  private loadUsers(): void {
    this.usersService.getUsers().subscribe({
      next: (data) => {
        console.log("API DATA", data);
        this.users = data;
         this.cdr.detectChanges();
      },
      error: (err) => {
        console.error("API ERROR", err);
      }
    });
  }

  public onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchQuery = target.value;
    this.usersService.searchUsers(this.searchQuery).subscribe({
      next: (data) => {
        console.log('Component Users:', data);
        console.log('Length:', data.length);

        this.users = data;
      },
      error: (err) => {
        console.error('Error searching users:', err);
      }
    });
  }

  public onViewUser(user: UserModel): void {
    this.selectedUser = user;
    this.isViewModalOpen = true;
  }

  public closeViewModal(): void {
    this.isViewModalOpen = false;
    this.selectedUser = null;
  }

  public onEditUser(user: UserModel): void {
    console.log('Edit User Info:', user);
  }

  public onDeleteUser(user: UserModel): void {
    this.userToDelete = user;
    this.isDeleteModalOpen = true;
  }

  public closeDeleteModal(): void {
    this.isDeleteModalOpen = false;
    this.userToDelete = null;
  }

  public confirmDelete(): void {
    if (this.userToDelete) {
      this.usersService.deleteUser(this.userToDelete.id).subscribe({
        next: (success) => {
          if (success) {
            this.usersService.searchUsers(this.searchQuery).subscribe(data => {
              this.users = data;
            });
          }
          this.closeDeleteModal();
        },
        error: (err) => {
          console.error('Error deleting user:', err);
          this.closeDeleteModal();
        }
      });
    }
  }
}