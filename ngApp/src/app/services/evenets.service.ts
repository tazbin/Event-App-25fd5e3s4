import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EvenetsService {

  constructor( private _http: HttpClient ) { }

  getEvents(){
    return this._http.get('http://127.0.0.1:3000/api/events');
  }

  getSpecialEvents(){
    return this._http.get('http://127.0.0.1:3000/api/special');
  }
}
