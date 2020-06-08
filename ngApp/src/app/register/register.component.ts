import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerUserData: any = {};
  error: any;
  success: any;

  constructor( private _auth: AuthService, private _router: Router ) { }

  ngOnInit(): void {
  }

  registerUser(){
    this.success = '';
    this.error = '';
    this._auth.registerUser(this.registerUserData).subscribe(
      res => {
        const response: any = res;
        localStorage.setItem('token', response.token);
        this._router.navigate(['/special']);
      },
      err => {
        this.error = err
      }
    );
    // console.log(this.registerUserData)
  }

}
