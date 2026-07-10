import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface UserModel {
  id: string;
  nbfcId: string;
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
    // NBFC001 - HDFC Credila
    {
      id: 'USR10001',
      nbfcId: 'NBFC001',
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
      nbfcId: 'NBFC001',
      name: 'Priya Patel',
      gender: 'Female',
      phone: '8765432109',
      email: 'priya.patel@example.com',
      address: '45, Navrangpura, Ahmedabad, Gujarat - 380009',
      paid: 85000,
      pending: 0,
      totalTransactions: 15
    },
    // NBFC002 - Bajaj Finance
    {
      id: 'USR10003',
      nbfcId: 'NBFC002',
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
      nbfcId: 'NBFC002',
      name: 'Sneha Rao',
      gender: 'Female',
      phone: '6543210987',
      email: 'sneha.rao@example.com',
      address: '102, Malleshwaram, Bangalore, Karnataka - 560003',
      paid: 120000,
      pending: 35000,
      totalTransactions: 22
    },
    // NBFC003 - Tata Capital
    {
      id: 'USR10005',
      nbfcId: 'NBFC003',
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
      nbfcId: 'NBFC003',
      name: 'Deepika Sen',
      gender: 'Female',
      phone: '9832109876',
      email: 'deepika.sen@example.com',
      address: '78, Salt Lake, Kolkata, West Bengal - 700091',
      paid: 35000,
      pending: 8000,
      totalTransactions: 6
    }
  ];

  constructor() {}

  public getUsersByNbfc(nbfcId: string): Observable<UserModel[]> {
    const list = this.users.filter(u => u.nbfcId === nbfcId);
    return of([...list]);
  }

  public searchUsers(nbfcId: string, keyword: string): Observable<UserModel[]> {
    const list = this.users.filter(u => u.nbfcId === nbfcId);
    if (!keyword || keyword.trim() === '') {
      return of([...list]);
    }
    const cleanKeyword = keyword.toLowerCase().trim();
    const filtered = list.filter(u => 
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
