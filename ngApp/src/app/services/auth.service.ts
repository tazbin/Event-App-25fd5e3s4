import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  value: boolean;

  constructor( private _http: HttpClient, private _router: Router ) { }

  registerUser(registerUserData){
    return this._http.post<any>('http://127.0.0.1:3000/api/register', registerUserData);
  }

  loginUser(loginUserData){
    return this._http.post<any>('http://127.0.0.1:3000/api/login', loginUserData)
  }

  addNewEvent(newEvent){
    return this._http.post<any>('http://127.0.0.1:3000/api/add-new-event', newEvent);
  }

  getMyEvents(userId){
    return this._http.get<any>('http://127.0.0.1:3000/api/get-my-events/'+userId);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  isLoggedIn(){
    return !!localStorage.getItem('token');
  }

  areYouValidUser(){
    return this._http.get<any>('http://127.0.0.1:3000/api/isLoggedIn');
  }

  Logout(){
    localStorage.removeItem('token');
    this._router.navigate(['/login']);
  }

  isRoutedToLogin(){
    return this.value;
  }
  
}
