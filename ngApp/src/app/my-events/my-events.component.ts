import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.css']
})
export class MyEventsComponent implements OnInit {
  newEvent: any = {};
  isValidUser: any;
  isAdded: any;
  userId: string;
  outputEvents: any = {};

  constructor( private _auth: AuthService, private _router: Router ) { }

  ngOnInit(): void {

    this._auth.areYouValidUser().subscribe(
      res => {
        this.isValidUser = res;
        if( this.isValidUser.user !== true ){
          this._auth.value = false;
          localStorage.removeItem('token');
          this._router.navigate(['/login']);
        } else{
          this.userId = res.userId;
          this._auth.getMyEvents(this.userId).subscribe(
            res => this.outputEvents = res,
            err => this.outputEvents = err
          );
        }
      },
      err => {
        this.isValidUser = err;
        if( err instanceof HttpErrorResponse ){
          if( err.status == 401 || 500 ){
            localStorage.removeItem('token');
          this._router.navigate(['/login']);
          }
        }
      }
    );
  }

  addEvent(){
    this._auth.addNewEvent(this.newEvent).subscribe(
      res => this.isAdded = res,
      err => {console.log(err)}
    );
  }

}
