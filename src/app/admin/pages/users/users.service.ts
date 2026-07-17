import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';

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

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://tst1.loomkji.in/loarphp/agetaccs.php';

  /**
   * Fetch users from backend
   */
  public getUsers(): Observable<UserModel[]> {
    return this.http.get<any>(this.apiUrl).pipe(

      map(response => {

        return response.data.prf.map((item: any, index: number) => {

          let loans: any[] = [];

          try {
            loans = JSON.parse(item.loandet || '[]');
          } catch (e) {
            console.error('Invalid loan JSON:', item.loandet);
            loans = [];
          }

          let paid = 0;
          let pending = 0;
          let totalTransactions = 0;

          loans.forEach((loan: any) => {

            const loanAmount = Number(loan.loanamt) || 0;
            const totalDues = Number(loan.totdues) || 0;
            const completedDues = Number(loan.cmpdues) || 0;

            const paidAmount =
              totalDues > 0
                ? (loanAmount / totalDues) * completedDues
                : 0;

            paid += paidAmount;
            pending += (loanAmount - paidAmount);
            totalTransactions += completedDues;

          });

          return {
            id: `USR${(response.data.prf.length - index).toString().padStart(5, '0')}`,
            name: item.name || '',
            gender:
              item.gend?.toLowerCase() === 'female'
                ? 'Female'
                : 'Male',
            phone: item.phone || '',
            email: item.email || '',
            address: item.addr || '',
            paid: Math.round(paid),
            pending: Math.round(pending),
            totalTransactions
          } as UserModel;

        });

      })

    );
  }

  /**
   * Search users
   */
  public searchUsers(keyword: string): Observable<UserModel[]> {

    return this.getUsers().pipe(

      map(users => {

        if (!keyword.trim()) {
          return users;
        }

        keyword = keyword.toLowerCase();

        return users.filter(user =>

          user.id.toLowerCase().includes(keyword) ||
          user.name.toLowerCase().includes(keyword) ||
          user.phone.toLowerCase().includes(keyword) ||
          user.email.toLowerCase().includes(keyword)

        );

      })

    );

  }

  /**
   * Get single user
   */
  public getUserById(id: string): Observable<UserModel | undefined> {

    return this.getUsers().pipe(

      map(users => users.find(user => user.id === id))

    );

  }

  /**
   * Temporary delete
   * Replace with HTTP DELETE when backend is ready.
   */
  public deleteUser(id: string): Observable<boolean> {

    console.log('Delete User:', id);

    return of(true);

  }

}