import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';

export const routes: Routes = [
  {
    path: 'users',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        exposedModule: './Component',
      }).then((m) => m.AppComponent),
  },
  {
    path: 'products',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4202/remoteEntry.js',
        exposedModule: './Component',
      }).then((m) => m.AppComponent),
  },
  {
    path: 'orders',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4203/remoteEntry.js',
        exposedModule: './Component',
      }).then((m) => m.AppComponent),
  },
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
];
