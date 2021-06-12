import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: HomePage,
    children: [
      {
        path: 'menu',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./menu/menu.module').then((m) => m.MenuPageModule),
          },
        ],
      },
      {
        path: 'overview',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./overview/overview.module').then(
                (m) => m.OverviewPageModule
              ),
          },
        ],
      },
      {
        path: 'tables',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./tables/tables.module').then((m) => m.TablesPageModule),
          },
        ],
      },
      {
        path: 'orders',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./orders/orders.module').then((m) => m.OrdersPageModule),
          },
        ],
      },
      {
        path: 'settings',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./settings/settings.module').then(
                (m) => m.SettingsPageModule
              ),
          },
        ],
      },
    ],
  },
  {
    path: '',
    redirectTo: '/home/tabs/tables',
    pathMatch: 'full',
  },
  {
    path: 'overview',
    loadChildren: () =>
      import('./overview/overview.module').then((m) => m.OverviewPageModule),
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('./orders/orders.module').then((m) => m.OrdersPageModule),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./settings/settings.module').then((m) => m.SettingsPageModule),
  },
  {
    path: 'menu',
    loadChildren: () =>
      import('./menu/menu.module').then((m) => m.MenuPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
