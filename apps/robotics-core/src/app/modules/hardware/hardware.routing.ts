import { Routes, RouterModule } from '@angular/router';
import { PageHardwareDashboardComponent } from './pages/page-hardware-dashboard/page-hardware-dashboard.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PageHardwareDashboardComponent,
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];

export const HardwareRoutes = RouterModule.forChild(routes);
