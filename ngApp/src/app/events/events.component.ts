import { Component, OnInit } from '@angular/core';
import { EvenetsService } from '../services/evenets.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  allEvents: any = [];
  error: any;

  constructor( private _eventAuth: EvenetsService ) { }

  ngOnInit(): void {
    this._eventAuth.getEvents().subscribe(
      res => this.allEvents = res,
      err => {
        this.error = err
      }
    )
  }

}
