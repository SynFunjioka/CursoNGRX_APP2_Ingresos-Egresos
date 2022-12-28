import { Injectable } from '@angular/core';
import { User, UserDoc } from '../models/user.model';
import {map} from 'rxjs/operators';

//NGRX
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as authActions from '../auth/auth.actions';
import * as ingresoEgresoActions from '../ingreso-egreso/ingreso-egreso.actions';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

import { Subscription } from 'rxjs';
// import { Firestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription!: Subscription;
  private _user!: UserDoc | null;

  get user(){
    return {...this._user};
  }

  constructor(
    public auth: AngularFireAuth,
    public firestore:AngularFirestore,
    private store:Store<AppState>) { }

  initAuthListener():void{
    this.auth.authState.subscribe(fius => {

      if(fius){
        this.userSubscription = this.firestore.doc(`${fius.uid}/usuario`).valueChanges().subscribe(fireUser => {
          const user = UserDoc.fromFirebase(fireUser);
          this._user = user;
          this.store.dispatch(authActions.setUser({user}));
        })
      }else{
        this._user = null;
        this.userSubscription.unsubscribe();
        this.store.dispatch(authActions.unsetUser());
        this.store.dispatch(ingresoEgresoActions.unsetItems());
      }
    })
  }

  createUser(userData: User){
    return this.auth.createUserWithEmailAndPassword(userData.email, userData.password)
        .then(({user}) => {
          if(user){
            const newUser = new UserDoc(user?.uid, userData.userName, userData.email);
            return this.firestore.doc(`${user.uid}/usuario`).set({...newUser});
          }
          return null;
        });
  }

  loginUser(email: string, password: string){
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout(){
    return this.auth.signOut();
  }

  isAuth(){
    return this.auth.authState.pipe(map(fbUs => fbUs != null));
  }
}
