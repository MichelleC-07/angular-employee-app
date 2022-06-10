import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, throwError } from 'rxjs';
import { EmployeeService } from './employee.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  private isLoggedIn: boolean;
  private userName: string | undefined;
  private httpOptions: any;
  private username: string | undefined;
  private password: string | undefined;
  public errorMsg: any;
  public token?: string; // the actual JWT token
  public token_expires?: Date; // the token expiration date
  private _token_url: string  = "http://127.0.0.1:8000/api/token/"
  private _refresh_token: string = "http://127.0.0.1:8000/api/token/refresh/"

  constructor(private empService: EmployeeService, private http: HttpClient) { 
    this.isLoggedIn = false;
  }

  // Request a new JWT token
  login(username: string, password: string){
    let cred = {
      "username": username,
      "password": password
    }
    return this.http.post('http://127.0.0.1:8000/api/token/', cred)
  
  }

  // logoutService(){
  //   localStorage.clear();

  // }

  // login(username: string, password: string){
  //  this.isLoggedIn = true;
  //  this.userName = username;
  //  return of(this.isLoggedIn);
  // }

  isUserLoggedIn(): boolean {
    // return this.isLoggedIn;
    if(localStorage.getItem('token')){
      return true;
    }
    return false;
  }

  // isAdminUser(): boolean {
  //   if (this.userName == 'admin') {
  //     return true;
  //   }
  //   return false;
  // }

  logoutUser(): void {
    this.isLoggedIn = false;
    localStorage.clear();
  }

  errorHandler(error: HttpErrorResponse){
    return throwError(error.message || "Server Errorrrrr")
  }

}
