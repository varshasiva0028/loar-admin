import { Routes } from '@angular/router';
import { authGuard } from './auth/auth-guard';

// Admin layout & login
import { AdminLayout } from './admin/layout/admin-layout/admin-layout';
import { Login as AdminLogin } from './admin/layout/login/login';

// Admin pages
import { Dashboard as AdminDashboard } from './admin/pages/dashboard/dashboard';
import { Transaction } from './admin/pages/transaction/transaction';
import { Users } from './admin/pages/users/users';
import { Notification as AdminNotification } from './admin/pages/notification/notification';
import { MyAccount as AdminMyAccount } from './admin/pages/myaccount/myaccount';
import { Reports as AdminReports } from './admin/pages/reports/reports';
import { Settings as AdminSettings } from './admin/pages/settings/settings';

// Super Admin layout & login
import { SrAdminLayout } from './sradmin/layout/sradmin-layout/sradmin-layout';
import { SrLogin } from './sradmin/layout/login/login';

// Super Admin pages
import { Dashboard as SrDashboard } from './sradmin/pages/dashboard/dashboard';
import { Nbfc } from './sradmin/pages/nbfc/nbfc';
import { Notification as SrNotification } from './sradmin/pages/notification/notification';
import { Myaccount as SrMyAccount } from './sradmin/pages/myaccount/myaccount';
import { Reports as SrReports } from './sradmin/pages/reports/reports';
import { Settings as SrSettings } from './sradmin/pages/settings/settings';

export const routes: Routes = [
  // Root Redirect
  {
    path: '',
    redirectTo: 'admin/login',
    pathMatch: 'full'
  },

  // Admin Portal Routes
  {
    path: 'admin/login',
    component: AdminLogin
  },
  {
    path: 'admin',
    component: AdminLayout,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: AdminDashboard
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
        path: 'notification',
        component: AdminNotification
      },
      {
        path: 'myaccount',
        component: AdminMyAccount
      },
      {
        path: 'reports',
        component: AdminReports
      },
      {
        path: 'settings',
        component: AdminSettings
      }
    ]
  },

  // Super Admin Portal Routes
  {
    path: 'sradmin/login',
    component: SrLogin
  },
  {
    path: 'sradmin',
    component: SrAdminLayout,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: SrDashboard
      },
      {
        path: 'nbfc',
        component: Nbfc
      },
      {
        path: 'notification',
        component: SrNotification
      },
      {
        path: 'myaccount',
        component: SrMyAccount
      },
      {
        path: 'reports',
        component: SrReports
      },
      {
        path: 'settings',
        component: SrSettings
      }
    ]
  },

  // Fallback Route redirects to Admin Login
  {
    path: '**',
    redirectTo: 'admin/login'
  }
];