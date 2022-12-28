import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import { setItems } from '../ingreso-egreso/ingreso-egreso.actions';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {

  userSubs!: Subscription;
  ingresosSubs!: Subscription;

  constructor(
    private store:Store<AppState>,
    private ingresoEgresoServoce:IngresoEgresoService
  ) { }

  ngOnInit(): void {
    this.userSubs = this.store.select('auth')
      .pipe(filter(auth => auth.user !== null))
      .subscribe(({user}) => {
        if(user){
          console.log('user', user);
          this.ingresosSubs = this.ingresoEgresoServoce.initIngresosEgresos(user.uid)
          .subscribe(ingresosEgresosFB => {
            this.store.dispatch(setItems({items: ingresosEgresosFB}))
          });
        }
      }
    )
  }

  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
    this.ingresosSubs.unsubscribe();
  }

}
