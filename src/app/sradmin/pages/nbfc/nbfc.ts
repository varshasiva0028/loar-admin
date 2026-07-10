import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NbfcService, NbfcModel } from './nbfc.service';

@Component({
  selector: 'app-nbfc',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nbfc.html',
  styleUrl: './nbfc.css'
})
export class Nbfc implements OnInit {
  public nbfcList: NbfcModel[] = [];
  public searchQuery: string = '';

  // Form Model Properties
  public username = '';
  public email = '';
  public nbfcName = '';
  public password = '';
  public confirmPassword = '';

  // Form Validation & Modal States
  public errors: Record<string, string> = {};
  public isSubmitted = false;
  public isModalOpen = false;

  constructor(
    private nbfcService: NbfcService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadNbfcList();
  }

  public loadNbfcList(): void {
    this.nbfcService.getNbfcList().subscribe({
      next: (data: NbfcModel[]) => {
        this.nbfcList = data;
      },
      error: (err: unknown) => {
        console.error('Error fetching NBFC list:', err);
      }
    });
  }

  public onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchQuery = target.value;

    this.nbfcService.searchNbfc(this.searchQuery).subscribe({
      next: (data: NbfcModel[]) => {
        this.nbfcList = data;
      },
      error: (err: unknown) => {
        console.error('Error searching NBFCs:', err);
      }
    });
  }

  public navigateToUsers(id: string): void {
    this.router.navigate(['/sradmin/nbfc/users', id]);
  }

  public navigateToTransactions(id: string): void {
    this.router.navigate(['/sradmin/nbfc/transactions', id]);
  }

  public openModal(): void {
    this.isModalOpen = true;
  }

  public closeModal(): void {
    this.isModalOpen = false;
    this.username = '';
    this.email = '';
    this.nbfcName = '';
    this.password = '';
    this.confirmPassword = '';
    this.errors = {};
    this.isSubmitted = false;
  }

  public validateField(field: string): void {
    if (!this.isSubmitted) return;
    
    if (field === 'username') {
      if (!this.username.trim()) {
        this.errors['username'] = 'Username is required.';
      } else if (this.username.trim().length < 4) {
        this.errors['username'] = 'Username must be at least 4 characters.';
      } else {
        delete this.errors['username'];
      }
    }

    if (field === 'email') {
      if (!this.email.trim()) {
        this.errors['email'] = 'Email ID is required.';
      } else {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(this.email.trim())) {
          this.errors['email'] = 'Please enter a valid email address.';
        } else {
          delete this.errors['email'];
        }
      }
    }

    if (field === 'nbfcName') {
      if (!this.nbfcName.trim()) {
        this.errors['nbfcName'] = 'NBFC Name is required.';
      } else {
        delete this.errors['nbfcName'];
      }
    }

    if (field === 'password') {
      if (!this.password) {
        this.errors['password'] = 'Password is required.';
      } else if (this.password.length < 6) {
        this.errors['password'] = 'Password must be at least 6 characters.';
      } else {
        delete this.errors['password'];
      }
    }

    if (field === 'confirmPassword') {
      if (!this.confirmPassword) {
        this.errors['confirmPassword'] = 'Confirm password is required.';
      } else if (this.password !== this.confirmPassword) {
        this.errors['confirmPassword'] = 'Passwords do not match.';
      } else {
        delete this.errors['confirmPassword'];
      }
    }
  }

  public validateForm(): boolean {
    this.errors = {};
    
    if (!this.username.trim()) {
      this.errors['username'] = 'Username is required.';
    } else if (this.username.trim().length < 4) {
      this.errors['username'] = 'Username must be at least 4 characters.';
    }

    if (!this.email.trim()) {
      this.errors['email'] = 'Email ID is required.';
    } else {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(this.email.trim())) {
        this.errors['email'] = 'Please enter a valid email address.';
      }
    }

    if (!this.nbfcName.trim()) {
      this.errors['nbfcName'] = 'NBFC Name is required.';
    }

    if (!this.password) {
      this.errors['password'] = 'Password is required.';
    } else if (this.password.length < 6) {
      this.errors['password'] = 'Password must be at least 6 characters.';
    }

    if (!this.confirmPassword) {
      this.errors['confirmPassword'] = 'Confirm password is required.';
    } else if (this.password !== this.confirmPassword) {
      this.errors['confirmPassword'] = 'Passwords do not match.';
    }

    return Object.keys(this.errors).length === 0;
  }

  public onCreateNbfc(): void {
    this.isSubmitted = true;
    if (this.validateForm()) {
      const newNbfcData = {
        username: this.username.trim(),
        email: this.email.trim(),
        nbfcName: this.nbfcName.trim(),
        password: this.password
      };
      
      this.nbfcService.createNbfc(newNbfcData).subscribe({
        next: () => {
          this.loadNbfcList();
          this.closeModal();
        },
        error: (err: unknown) => {
          console.error('Error creating NBFC:', err);
        }
      });
    }
  }
}
