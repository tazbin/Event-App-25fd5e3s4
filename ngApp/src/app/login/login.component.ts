import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginUserData: any = {};
  error: any;

  constructor( public _auth: AuthService, private _router: Router ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void{
    this._auth.value = false;
  }

  loginUser(){
    this._auth.value = false;
    this._auth.loginUser(this.loginUserData).subscribe(
      res => {
        const response: any = res;
        localStorage.setItem('token', response.token);
        this._router.navigate(['/special']);
      },
      err => {
        this.error = err;
      }
    )
  }
}
