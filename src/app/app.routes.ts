import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/public/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'propiedades',
    loadComponent: () =>
      import('./features/public/property-list/property-list.component').then(
        (m) => m.PropertyListComponent
      ),
  },
  {
    path: 'propiedades/:id',
    loadComponent: () =>
      import('./features/public/property-detail/property-detail.component').then(
        (m) => m.PropertyDetailComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'registro',
    loadComponent: () =>
      import('./features/auth/register/register.component').then((m) => m.RegisterComponent),
  },
  {
    path: 'mi-cuenta',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/client/dashboard/client-dashboard.component').then(
        (m) => m.ClientDashboardComponent
      ),
  },
  {
    path: 'admin',
    canActivate: [roleGuard('admin', 'agente')],
    loadComponent: () =>
      import('./features/admin/dashboard/admin-dashboard.component').then(
        (m) => m.AdminDashboardComponent
      ),
  },
  {
    path: 'admin/propiedades',
    canActivate: [roleGuard('admin', 'agente')],
    loadComponent: () =>
      import('./features/admin/properties/admin-properties.component').then(
        (m) => m.AdminPropertiesComponent
      ),
  },
  {
    path: 'admin/propiedades/nueva',
    canActivate: [roleGuard('admin', 'agente')],
    loadComponent: () =>
      import('./features/admin/property-form/admin-property-form.component').then(
        (m) => m.AdminPropertyFormComponent
      ),
  },
  {
    path: 'admin/propiedades/:id/editar',
    canActivate: [roleGuard('admin', 'agente')],
    loadComponent: () =>
      import('./features/admin/property-form/admin-property-form.component').then(
        (m) => m.AdminPropertyFormComponent
      ),
  },
  {
    path: 'admin/usuarios',
    canActivate: [roleGuard('admin')],
    loadComponent: () =>
      import('./features/admin/users/admin-users.component').then((m) => m.AdminUsersComponent),
  },
  {
    path: 'admin/solicitudes',
    canActivate: [roleGuard('admin', 'agente')],
    loadComponent: () =>
      import('./features/admin/transactions/admin-transactions.component').then(
        (m) => m.AdminTransactionsComponent
      ),
  },
  { path: '**', redirectTo: '' },
];
