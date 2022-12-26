import { Injectable } from '@angular/core';
import { User, UserDoc } from '../models/user.model';
import {map} from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
// import { Firestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth, public firestore:AngularFirestore) { }

  initAuthListener():void{
    this.auth.authState.subscribe(fius => {
      console.log(fius?.uid);
      console.log(fius?.email);

    })
  }

  createUser(userData: User){
    console.log(userData);
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
