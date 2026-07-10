import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface UserModel {
  id: string;
  name: string;
  gender: 'Male' | 'Female';
  phone: string;
  email: string;
  address: string;
  paid: number;
  pending: number;
  totalTransactions: number;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private users: UserModel[] = [
    {
      id: 'USR10001',
      name: 'Rahul Sharma',
      gender: 'Male',
      phone: '9876543210',
      email: 'rahul.sharma@example.com',
      address: '12, MG Road, Bangalore, Karnataka - 560001',
      paid: 45000,
      pending: 12000,
      totalTransactions: 8
    },
    {
      id: 'USR10002',
      name: 'Priya Patel',
      gender: 'Female',
      phone: '8765432109',
      email: 'priya.patel@example.com',
      address: '45, Navrangpura, Ahmedabad, Gujarat - 380009',
      paid: 85000,
      pending: 0,
      totalTransactions: 15
    },
    {
      id: 'USR10003',
      name: 'Arjun Reddy',
      gender: 'Male',
      phone: '7654321098',
      email: 'arjun.reddy@example.com',
      address: '89, Jubilee Hills, Hyderabad, Telangana - 500033',
      paid: 20000,
      pending: 5000,
      totalTransactions: 4
    },
    {
      id: 'USR10004',
      name: 'Sneha Rao',
      gender: 'Female',
      phone: '6543210987',
      email: 'sneha.rao@example.com',
      address: '102, Malleshwaram, Bangalore, Karnataka - 560003',
      paid: 120000,
      pending: 35000,
      totalTransactions: 22
    },
    {
      id: 'USR10005',
      name: 'Amit Verma',
      gender: 'Male',
      phone: '9812345678',
      email: 'amit.verma@example.com',
      address: '256, Saket, New Delhi, Delhi - 110017',
      paid: 250000,
      pending: 15000,
      totalTransactions: 31
    },
    {
      id: 'USR10006',
      name: 'Deepika Sen',
      gender: 'Female',
      phone: '9832109876',
      email: 'deepika.sen@example.com',
      address: '78, Salt Lake, Kolkata, West Bengal - 700091',
      paid: 35000,
      pending: 8000,
      totalTransactions: 6
    },
    {
      id: 'USR10007',
      name: 'Vikram Joshi',
      gender: 'Male',
      phone: '9012345678',
      email: 'vikram.joshi@example.com',
      address: '14, FC Road, Pune, Maharashtra - 411004',
      paid: 15000,
      pending: 2500,
      totalTransactions: 3
    },
    {
      id: 'USR10008',
      name: 'Neha Gupta',
      gender: 'Female',
      phone: '8921098765',
      email: 'neha.gupta@example.com',
      address: '402, Hazratganj, Lucknow, Uttar Pradesh - 226001',
      paid: 62000,
      pending: 0,
      totalTransactions: 11
    },
    {
      id: 'USR10009',
      name: 'Rohan Das',
      gender: 'Male',
      phone: '7832109876',
      email: 'rohan.das@example.com',
      address: '55, Gariahat, Kolkata, West Bengal - 700019',
      paid: 75000,
      pending: 18000,
      totalTransactions: 10
    },
    {
      id: 'USR10010',
      name: 'Anjali Nair',
      gender: 'Female',
      phone: '8843210987',
      email: 'anjali.nair@example.com',
      address: '12B, MG Road, Ernakulam, Kerala - 682016',
      paid: 220000,
      pending: 45000,
      totalTransactions: 18
    },
     {
      id: 'USR10011',
      name: 'Anushka Reddy',
      gender: 'Female',
      phone: '8843210987',
      email: 'anushka@example.com',
      address: '12B, MG Road, AndraPradesh - 682016',
      paid: 320000,
      pending: 55000,
      totalTransactions: 14
    }
  ];
  constructor() {}

  public getUsers(): Observable<UserModel[]> {
    return of([...this.users]);
  }

  public searchUsers(keyword: string): Observable<UserModel[]> {
    if (!keyword || keyword.trim() === '') {
      return of([...this.users]);
    }
    const cleanKeyword = keyword.toLowerCase().trim();
    const filtered = this.users.filter(u => 
      u.id.toLowerCase().includes(cleanKeyword) ||
      u.name.toLowerCase().includes(cleanKeyword) ||
      u.phone.includes(cleanKeyword) ||
      u.email.toLowerCase().includes(cleanKeyword)
    );
    return of(filtered);
  }

  public deleteUser(id: string): Observable<boolean> {
    const initialLength = this.users.length;
    this.users = this.users.filter(u => u.id !== id);
    return of(this.users.length < initialLength);
  }

  public getUserById(id: string): Observable<UserModel | undefined> {
    const user = this.users.find(u => u.id === id);
    return of(user ? { ...user } : undefined);
  }
}