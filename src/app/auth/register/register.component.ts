import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

import { AuthService } from '../../services/auth.service';

import { User } from '../../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  createUser():void{
    if(this.registerForm.invalid){return;}

    Swal.fire({
      title: 'Espere por favor',
      didOpen: () => {

        Swal.showLoading(null)
      }
    })

    const { userName, email, password } = this.registerForm.value;
    const newUser:User = {
      userName,
      email,
      password
    }

    this.authService.createUser(newUser)
      .then(credentials => {
        Swal.close();
        this.router.navigate(['/'])}
        )
      .catch(err =>{
        console.error(err);
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
