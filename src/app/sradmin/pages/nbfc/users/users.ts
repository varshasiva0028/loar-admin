import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService, UserModel } from './users.service';

@Component({
  selector: 'app-nbfc-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class Users implements OnInit {
  public users: UserModel[] = [];
  public searchQuery: string = '';
  public nbfcId: string = '';

  // Modal states
  public selectedUser: UserModel | null = null;
  public isViewModalOpen: boolean = false;
  public isDeleteModalOpen: boolean = false;
  public userToDelete: UserModel | null = null;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private router: Router
  ) {}

  public goBack(): void {
    this.router.navigate(['/sradmin/nbfc']);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.nbfcId = params.get('id') || '';
      this.loadUsers();
    });
  }

  private loadUsers(): void {
    if (!this.nbfcId) return;
    this.usersService.getUsersByNbfc(this.nbfcId).subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        console.error('Error loading users:', err);
      }
    });
  }

  public onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchQuery = target.value;
    if (!this.nbfcId) return;
    this.usersService.searchUsers(this.nbfcId, this.searchQuery).subscribe({
      next: (data) => {
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
            this.usersService.searchUsers(this.nbfcId, this.searchQuery).subscribe(data => {
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
