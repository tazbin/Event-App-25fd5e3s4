import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _router: Router, private _auth: AuthService) {}

  canActivate(){
    if( this._auth.isLoggedIn() ){
      return true;
    } else{
      this._router.navigate(['/login']);
    this._auth.value = true;
    return false;
    }
  }
  
}
