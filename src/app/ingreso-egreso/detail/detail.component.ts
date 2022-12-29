import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { AppStateWithIngreso } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styles: [
  ]
})
export class DetailComponent implements OnInit, OnDestroy {

  ingresosEgresos: IngresoEgreso[] = [];
  ingresosSubs!: Subscription;

  constructor(private store:Store<AppStateWithIngreso>, private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit(): void {
    this.ingresosSubs = this.store.select('ingresosEgresos')
    .subscribe(({items}) => this.ingresosEgresos = items);
  }

  ngOnDestroy(): void {
    this.ingresosSubs.unsubscribe();
  }

  deleteIngresoEgreso(uidItem: string):void{
    this.ingresoEgresoService.deleteIngresoEgreso(uidItem).then( () =>
      Swal.fire({
        icon: 'success',
        title: 'Eliminado',
        text: 'Elemento eliminado con éxito'
      })
    ).catch(err => Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'No pudimos eliminar el elemento, inténtelo de nuevo más tarde',
    }))
  }
}
