import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';
import { HomePage } from '../home/home.page';
import { CampaignPage } from '../campaign/campaign.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    // redirectTo: '/home',
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },

      {
        path: 'home',
        loadChildren: () =>
          import('../campaign/campaign.module').then(
            (m) => m.CampaignPageModule
          ),
      },

      {
        path: 'explore',
        loadChildren: () =>
          import('../explore/explore.module').then((m) => m.ExplorePageModule),
      },
      {
        path: 'notification',
        loadChildren: () =>
          import('../notification/notification.module').then(
            (m) => m.NotificationPageModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../new-profile/new-profile.module').then(
            (m) => m.NewProfilePageModule
          ),
      },
    ],
  },
];

// {

//   path: 'tabs',
//   component: TabsPage,
//   children: [
//     {
//       path: 'discover',
//       loadChildren: () => import('../home/home.module').then((m) => { m.HomePageModule }}

//   ]

// }
// }

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
