import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

//NGRX
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';

import { AuthService } from '../../services/auth.service';

import { User } from '../../models/user.model';
import { Subscription } from 'rxjs';
import { isLoading, stopLoading } from 'src/app/shared/ui.actions';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerForm!: FormGroup;

  loading: boolean = false;
  uiSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private store:Store<AppState>,
    private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })

    this.uiSubscription = this.store.select('ui').subscribe(ui => this.loading = ui.isLoading);

  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  createUser():void{
    if(this.registerForm.invalid){return;}

    this.store.dispatch(isLoading());

    // Swal.fire({
    //   title: 'Espere por favor',
    //   didOpen: () => {

    //     Swal.showLoading(null)
    //   }
    // })

    const { userName, email, password } = this.registerForm.value;
    const newUser:User = {
      userName,
      email,
      password
    }

    this.authService.createUser(newUser)
      .then(credentials => {
        // Swal.close();
        this.store.dispatch(stopLoading());
        this.router.navigate(['/'])}
        )
      .catch(err =>{
        console.error(err);
        this.store.dispatch(stopLoading());

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
        })
      });

    // console.log(this.registerForm);
    // console.log(this.registerForm.valid);
    // console.log(this.registerForm.value);
  }

}
