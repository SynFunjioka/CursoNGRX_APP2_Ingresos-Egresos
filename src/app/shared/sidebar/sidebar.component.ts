import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit, OnDestroy {

  username!:string;
  userSubs!: Subscription;

  constructor(private authService: AuthService, private route: Router, private store:Store<AppState>) { }

  ngOnInit(): void {
    this.userSubs = this.store.select('auth').pipe(filter(({user}) => user!== null))
      .subscribe(({user}) => {
        if(user){
          this.username = user.userName
        }
      }
    );
  }
  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
  }

  logout():void{
    this.authService.logout().then(() => {
      this.route.navigate(['/login'])
    }).catch(err => console.log(err));
  }
}
