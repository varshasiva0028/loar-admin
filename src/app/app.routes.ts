import { Routes } from '@angular/router';

/* ===========================
   Admin Imports
=========================== */

import { AdminLayout } from './admin/layout/admin-layout/admin-layout';

import { Dashboard } from './admin/pages/dashboard/dashboard';
import { Transaction } from './admin/pages/transaction/transaction';
import { Users } from './admin/pages/users/users';
import { MyAccount } from './admin/pages/myaccount/myaccount';
import { Reports } from './admin/pages/reports/reports';
import { Settings } from './admin/pages/settings/settings';
import { Notification } from './admin/pages/notification/notification';

/* ===========================
   Super Admin Imports
=========================== */

import { SrAdminLayout } from './sradmin/layout/sradmin-layout/sradmin-layout';

import { Dashboard as SrDashboard } from './sradmin/pages/dashboard/dashboard';
import { Nbfc } from './sradmin/pages/nbfc/nbfc';
import { Notification as SrNotification } from './sradmin/pages/notification/notification';
import { Myaccount as SrMyAccount } from './sradmin/pages/myaccount/myaccount';import { Reports as SrReports } from './sradmin/pages/reports/reports';
import { Settings as SrSettings } from './sradmin/pages/settings/settings';

export const routes: Routes = [

  /* ===========================
     Admin
  =========================== */

  {
    path: 'admin',
    component: AdminLayout,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: Dashboard },
      { path: 'transaction', component: Transaction },
      { path: 'users', component: Users },
      { path: 'notification', component: Notification },
      { path: 'myaccount', component: MyAccount },
      { path: 'reports', component: Reports },
      { path: 'settings', component: Settings }
    ]
  },

  /* ===========================
     Super Admin
  =========================== */

  {
    path: 'sradmin',
    component: SrAdminLayout,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: SrDashboard },
      { path: 'nbfc', component: Nbfc },
      { path: 'notification', component: SrNotification },
      { path: 'myaccount', component: SrMyAccount },
      { path: 'reports', component: SrReports },
      { path: 'settings', component: SrSettings }
    ]
  },

  /* ===========================
     Default Route
  =========================== */

  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full'
  },

  {
    path: '**',
    redirectTo: 'admin'
  }
];