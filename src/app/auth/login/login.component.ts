import { Component, OnDestroy, OnInit } from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from 'src/app/services/auth.service';

import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { isLoading, stopLoading } from 'src/app/shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {

  loading: boolean = false;
  loginForm!: FormGroup;
  uiSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store:Store<AppState>
    ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.uiSubscription = this.store.select('ui').subscribe(ui => this.loading = ui.isLoading);
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  login():void{
    if(this.loginForm.invalid){return;}

    this.store.dispatch(isLoading());

    const { email, password } = this.loginForm.value;

    this.authService.loginUser(email, password)
      .then(credentials => {
        // Swal.close();
        this.store.dispatch(stopLoading());

        this.router.navigate(['/'])}
        )
      .catch(err => {
        console.error(err);
        this.store.dispatch(stopLoading());

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
        })
      });
  }

}
