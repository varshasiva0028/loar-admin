import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface NbfcModel {
  id: string;
  username: string;
  email: string;
  nbfcName: string;
  totalUsers: number;
  totalReceivable: number;
  totalPaid: number;
  totalTransactions: number;
}

@Injectable({
  providedIn: 'root'
})
export class NbfcService {
  private nbfcList: NbfcModel[] = [
    {
      id: 'NBFC001',
      username: 'admin_hdfc',
      email: 'admin@hdfc.com',
      nbfcName: 'HDFC Credila',
      totalUsers: 1250,
      totalReceivable: 82500000,
      totalPaid: 71000000,
      totalTransactions: 15320
    },
    {
      id: 'NBFC002',
      username: 'admin_bajaj',
      email: 'admin@bajaj.com',
      nbfcName: 'Bajaj Finance',
      totalUsers: 2150,
      totalReceivable: 124000000,
      totalPaid: 105500000,
      totalTransactions: 24510
    },
    {
      id: 'NBFC003',
      username: 'admin_tata',
      email: 'admin@tata.com',
      nbfcName: 'Tata Capital',
      totalUsers: 980,
      totalReceivable: 57000000,
      totalPaid: 50200000,
      totalTransactions: 11890
    }
  ];

  constructor() {}

  public getNbfcList(): Observable<NbfcModel[]> {
    return of(this.nbfcList);
  }

  public searchNbfc(keyword: string): Observable<NbfcModel[]> {
    if (!keyword || !keyword.trim()) {
      return of(this.nbfcList);
    }
    const search = keyword.toLowerCase().trim();
    const filtered = this.nbfcList.filter(
      item =>
        item.id.toLowerCase().includes(search) ||
        item.username.toLowerCase().includes(search) ||
        item.email.toLowerCase().includes(search) ||
        item.nbfcName.toLowerCase().includes(search)
    );
    return of(filtered);
  }

  public createNbfc(nbfc: Omit<NbfcModel, 'id' | 'totalUsers' | 'totalReceivable' | 'totalPaid' | 'totalTransactions'>): Observable<NbfcModel> {
    const nextIdNumber = this.nbfcList.length + 1;
    const paddedId = String(nextIdNumber).padStart(3, '0');
    const newNbfc: NbfcModel = {
      ...nbfc,
      id: `NBFC${paddedId}`,
      totalUsers: 0,
      totalReceivable: 0,
      totalPaid: 0,
      totalTransactions: 0
    };
    this.nbfcList.push(newNbfc);
    return of(newNbfc);
  }
}
