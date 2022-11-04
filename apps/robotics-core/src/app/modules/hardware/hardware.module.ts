import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HardwareComponent } from './hardware.component';
import { HardwareRoutes } from './hardware.routing';
import { ThemeModule } from '../../@theme/theme.module';
import { NbMenuModule } from '@nebular/theme';
import { PageHardwareDashboardComponent } from './pages/page-hardware-dashboard/page-hardware-dashboard.component';

import { NgFlowchartModule } from '@joelwenzel/ng-flowchart';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    NbMenuModule,
    HardwareRoutes,
    NgFlowchartModule,
  ],
  declarations: [
    HardwareComponent,
    PageHardwareDashboardComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class HardwareModule { }
