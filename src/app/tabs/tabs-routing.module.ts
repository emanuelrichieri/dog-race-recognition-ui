import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'upload-images',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../upload-images/upload-images.module').then(m => m.UploadImagesPageModule)
          }
        ]
      },
      {
        path: 'query-image',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../query-image/query-image.module').then(m => m.QueryImagePageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/query-image',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/query-image',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
