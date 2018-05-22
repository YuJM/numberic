import { Routes } from '@angular/router/src/config';
import { P1Component } from './views/p1/p1.component';
import { StartViewComponent } from './views/start-view/start-view.component';

export const routes: Routes = [
  {
    path: '',
    component: StartViewComponent
  },
  {
    path: 'p1',
    component: P1Component
  }
];
