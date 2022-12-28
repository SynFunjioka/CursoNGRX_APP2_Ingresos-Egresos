import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//*NGRX
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { stopLoading, isLoading } from '../shared/ui.actions';

import Swal from 'sweetalert2';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { Subscription } from 'rxjs';

type actionType = 'ingreso' | 'egreso';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  ingresoForm!: FormGroup
  action: actionType = 'ingreso';

  loading: boolean = false;

  uiSubscription!:Subscription;

  constructor(
    private fb: FormBuilder,
    private ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>
    ) { }


    ngOnInit(): void {
      this.ingresoForm = this.fb.group({
        description: ['', Validators.required],
        amount: ['', Validators.required],
      })

      this.uiSubscription = this.store.select('ui').subscribe(({isLoading}) => {
        this.loading = isLoading;
      })
    }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  save(): void{

    if(this.ingresoForm.invalid){return;}

    this.store.dispatch(isLoading());

    const { description, amount } = this.ingresoForm.value;
    const newIngresoEgreso = new IngresoEgreso(description, amount, this.action);

    this.ingresoEgresoService.createIngresoEgreso(newIngresoEgreso)
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Agregado',
            text: `Se ha agregado un nuevo ${this.action}`,
          });
          this.ingresoForm.reset();
          this.store.dispatch(stopLoading());

        })
        .catch(err => {
          console.warn('Error on adding ingreso/egreso', err);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Tuvimos problemas para agregar este nuevo ${this.action}`,
          });
          this.store.dispatch(stopLoading());
        });;
  }
}
