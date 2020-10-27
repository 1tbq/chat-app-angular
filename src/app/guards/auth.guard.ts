import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {map,take,tap} from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';
import { Alert } from '../classes/alert';
import { AlertType } from '../enums/alert-type.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private auth:AuthService,
    private router:Router,
    private alertService:AlertService 
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    //pipe below allow us to use certain rxjs functions in a row
    return this.auth.currentUser.pipe(
      //we take the first item on observable chain
      take(1),
      //the current user is the first item we convert that to boolean type
      // the double not-not will change the return type to boolean/* we could also use  Boolean(currentUser) to change it to boolean
      map((currentUser) => !!currentUser),
      //if not errors or anything then tap return the original value what ever it was brought to
      tap((loggedIn) => {
        if (!loggedIn) {
          this.alertService.alerts.next(new Alert('You must be logged in to access this page', AlertType.Danger));
          //upon successful loging we take them back to return url which the user tried to visit
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } })
        }
      })
   )
     
  }



}
