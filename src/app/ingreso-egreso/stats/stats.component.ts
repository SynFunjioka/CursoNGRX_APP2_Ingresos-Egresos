import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChartData, ChartType } from 'chart.js';
import { ChartEvent } from 'chart.js/dist/core/core.plugins';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styles: [
  ]
})
export class StatsComponent implements OnInit {

  ingresos: number = 0;
  egresos: number = 0;
  totalEgresos: number = 0;
  totalIngresos: number = 0;

  //<t1>Grafica
  doughnutChartType: ChartType = 'doughnut';
  doughnutChartLabels: string[] = [ 'Ingresos', 'Egresos' ];
  doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [] },
    ]
  };

  constructor(private store:Store<AppState>) { }

  ngOnInit(): void {
    this.store.select('ingresosEgresos').subscribe(({items}) => this.generateStat(items))
  }

  generateStat(items: IngresoEgreso[]){
    this.totalEgresos, this.totalIngresos, this.ingresos, this.egresos = 0;

    for (const item of items) {
      if(item.type === 'ingreso'){
        this.totalIngresos += item.amount;
        this.ingresos ++;
      }else{
        this.totalEgresos += item.amount;
        this.egresos ++;

      }
    }

    this.doughnutChartData.datasets[0].data = [this.totalEgresos, this.totalEgresos];
  }

  chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }
}
