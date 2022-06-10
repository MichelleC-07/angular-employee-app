import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

// interceptor changes your header automatically   
export class InterceptorService implements HttpInterceptor{

  constructor() { }

  // implement interceptor interface method
  // param req
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = localStorage.getItem('token')
    console.log(token)
    if(token) {
      const modified_req = req.clone({
        headers: req.headers.set('Authorization',"Bearer " + token)
      })
      return next.handle(modified_req);
    } else {
      return next.handle(req)
    }
    
  }
}
