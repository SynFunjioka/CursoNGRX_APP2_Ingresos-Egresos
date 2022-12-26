import { Routes } from "@angular/router";
import { DetailComponent } from "../ingreso-egreso/detail/detail.component";
import { IngresoEgresoComponent } from "../ingreso-egreso/ingreso-egreso.component";
import { StatsComponent } from "../ingreso-egreso/stats/stats.component";

export const dashboardRoutes: Routes = [
  {
    path: '',
    component:  StatsComponent
  },
  {
    path: 'ingreso-egreso',
    component:  IngresoEgresoComponent
  },
  {
    path: 'detail',
    component:  DetailComponent
  }
]
