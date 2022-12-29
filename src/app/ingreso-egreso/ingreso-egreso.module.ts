import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { DetailComponent } from './detail/detail.component';
import { StatsComponent } from './stats/stats.component';
import { OrdenIngresoPipe } from '../pipes/orden-ingreso.pipe';

import { NgChartsModule } from 'ng2-charts';

import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutesModule } from '../dashboard/dashboard-routes.module';
import { StoreModule } from '@ngrx/store';
import { ingresoEgresoReducer } from './ingreso-egreso.reducer';



@NgModule({
  declarations: [
    DashboardComponent,
    IngresoEgresoComponent,
    DetailComponent,
    StatsComponent,
    OrdenIngresoPipe,

  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('ingresosEgresos', ingresoEgresoReducer),
    ReactiveFormsModule,
    SharedModule,
    NgChartsModule,
    DashboardRoutesModule,
    NgChartsModule
  ],
  exports: [

  ]
})
export class IngresoEgresoModule { }
