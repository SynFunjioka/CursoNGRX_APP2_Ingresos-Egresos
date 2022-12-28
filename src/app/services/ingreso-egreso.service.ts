import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';

import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {


  constructor(private firestore:AngularFirestore,
      private authService: AuthService) { }

  createIngresoEgreso(ingresoEgreso: IngresoEgreso){

    delete ingresoEgreso.uid;
    return this.firestore.doc(`${this.authService.user.uid}/ingreso-egreso`).collection('items')
      .add({...ingresoEgreso});
  }

  initIngresosEgresos(uid: string){
    return this.firestore.collection(`${uid}/ingreso-egreso/items`)
      .snapshotChanges()
      .pipe(
        map(snapshot => snapshot.map(doc => ({
                uid: doc.payload.doc.id,
                ...doc.payload.doc.data() as any
              }))
        )
      )
  }

  deleteIngresoEgreso(uidItem: string) {
    const uid = this.authService.user.uid;
    return this.firestore.doc(`${uid}/ingreso-egreso/items/${uidItem}`).delete();
  }
}
