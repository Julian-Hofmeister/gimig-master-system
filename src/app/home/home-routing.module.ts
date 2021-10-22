import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: HomePage,
    children: [
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
        path: 'protocol',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./protocol/protocol.module').then(
                (m) => m.ProtocolPageModule
              ),
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
    redirectTo: '/home/tabs/overview',
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
    path: 'protocol',
    loadChildren: () =>
      import('./protocol/protocol.module').then((m) => m.ProtocolPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
