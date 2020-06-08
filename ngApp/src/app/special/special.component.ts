import { Component, OnInit } from '@angular/core';
import { EvenetsService } from '../services/evenets.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-special',
  templateUrl: './special.component.html',
  styleUrls: ['./special.component.css']
})
export class SpecialComponent implements OnInit {
  allSpecialEvents: any = [];
  userId: string;
  error: any;

  constructor( private _eventAuth: EvenetsService, private _router: Router ) { }

  ngOnInit(): void {
    this._eventAuth.getSpecialEvents().subscribe(
      res => {
        const response: any = res;
        this.allSpecialEvents = response.specialEvents;
        this.userId = response.userId;
      },
      err => {
        this.error = err
        if( err instanceof HttpErrorResponse ){
          if ( err.status == 401 || 500 ){
            localStorage.removeItem('token');
            this._router.navigate(['./login']);
          }
        }
      }
    )
  }

}
