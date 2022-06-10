import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaderResponse, HttpHeaders } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { IEmployee } from '../interfaces/iemployee';
import { ICredentials } from '../interfaces/icredentials';



@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  public empData: IEmployee[] = []

  private _get_emp_url: string = "http://127.0.0.1:8000/employee/employee-list/"
  private _create_emp_url: string = "http://127.0.0.1:8000/employee/employee-create/"
  private _update_emp_url: string = "http://127.0.0.1:8000/employee/employee-update/"
  private _delete_emp_url: string = "http://127.0.0.1:8000/employee/employee-delete/"
  private _user_credentials = "http://127.0.0.1:8000/employee/get_credentials/"
  
  constructor(private http: HttpClient) { 
    
  }

  getAllEmployees(): Observable<IEmployee[]>{
    // let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU0ODIyNjg5LCJpYXQiOjE2NTQ4MjIzODksImp0aSI6ImY1YTNmYmI1NWY3NzQwYWZiYWMxODM4ODNhZDYyZDU1IiwidXNlcl9pZCI6MX0.jJreD9EC9Mm5b819S3W7yxTd79AgLqGHZbW9e3u-A4E"
    // const headers = new HttpHeaders()
    //                 .set('Authorization', 'Bearer' + token);
    return this.http.get<IEmployee[]>(this._get_emp_url)  // send headers to backend
    .pipe(catchError(this.errorHandler));
  }

  getOneEmployee(id: number): Observable<IEmployee[]>{
    // return this.employees;
    return this.http.get<IEmployee[]>(this._get_emp_url + id + "/")
    .pipe(catchError(this.errorHandler));
  }

  createEmployee(body: any): Observable<IEmployee[]>{
    return this.http.post<IEmployee[]>(this._create_emp_url, body)
    .pipe(catchError(this.errorHandler));
  }

  updateEmployee(id: number, body: any){
    return this.http.put<IEmployee[]>(this._update_emp_url + id + "/", body)
    .pipe(catchError(this.errorHandler));
  }

  deleteEmployee(id: number){
    return this.http.delete(this._delete_emp_url + id + '/')
    .pipe(catchError(this.errorHandler));
  }

  // // API to get the user credentials from Django User Model
  // getCredentials(username: any):Observable<any>{
  //   return this.http.get(this._user_credentials + username + '/')
  //   .pipe(catchError(this.errorHandler));
  // }



  errorHandler(error: HttpErrorResponse){
    return throwError(error.message || "Server Errorrrrr")
  }

  addRow(newItem: IEmployee){
    let item = {
      ...newItem
    }
    this.empData.push(item);
  }

  viewRow(item: IEmployee){
    alert(`
    Id: ${item.id},
    First Name: ${item.first_name},
    Last Name: ${item.last_name},
    Department: ${item.department},
    Salary: ${item.salary}`)
  }

  updateRow(id: number, updateItem: IEmployee){
    let item = {
      ... updateItem
    }
    for(let i = 0; i < this.empData.length; i++){
      if(id == this.empData[i].id){
        this.empData.splice(i, 1); // remove old item from data
        this.empData.splice(i,0, item);
        break;
      }
    }
  }

  deleteRow(id: number){
    for(let i = 0; i < this.empData.length; i++) {
      if (id==this.empData[i].id){
        this.empData.splice(i, 1);
        break;
      }
    }
  }


}
