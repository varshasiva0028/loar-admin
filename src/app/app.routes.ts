import { Routes } from '@angular/router';

import { AdminLayout } from './admin/layout/admin-layout/admin-layout';

import { Dashboard } from './admin/pages/dashboard/dashboard';
import { Transaction } from './admin/pages/transaction/transaction';
import { Users } from './admin/pages/users/users';
import { MyAccount } from './admin/pages/myaccount/myaccount';
import { Reports } from './admin/pages/reports/reports';
import { Settings } from './admin/pages/settings/settings';
export const routes: Routes = [
  {
    path: '',
    component: AdminLayout,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: Dashboard
      },
      {
        path: 'transaction',
        component: Transaction
      },
      {
        path: 'users',
        component: Users
      },
      {
        path: 'myaccount',
        component: MyAccount
      },
      {
        path: 'reports',
        component: Reports
      },
      {
        path: 'settings',
        component: Settings
      }
    ]
  },

  {
    path: '**',
    redirectTo: 'dashboard'
  }
];