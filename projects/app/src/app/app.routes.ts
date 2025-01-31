import { Routes } from '@angular/router';
import { MainLayoutComponent } from 'shared';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'blogs',
        loadChildren: ()=> import('blogs').then(m => m.blogRoutes)
      }
    ]
  }
];
