import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  login():void{
    if(this.loginForm.invalid){return;}

    Swal.fire({
      title: 'Espere por favor',
      didOpen: () => {

        Swal.showLoading(null)
      }
    })

    const { email, password } = this.loginForm.value;

    this.authService.loginUser(email, password)
      .then(credentials => {
        Swal.close();
        this.router.navigate(['/'])}
        )
      .catch(err => {
        console.error(err)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
        })
      });
  }

}
