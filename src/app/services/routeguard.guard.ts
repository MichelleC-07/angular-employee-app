import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthGuardService } from './authservice.service';


@Injectable({
  providedIn: 'root'
})
export class RouteguardGuard implements CanActivate {

  constructor(private authService: AuthGuardService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if (!this.authService.isUserLoggedIn()) {
      alert('You are not allowed to view this page. You will be redirected to the login page');
      this.router.navigate(["login"], { queryParams: { retUrl: route.url}});
      return false;
    }
    return true;
  }
  
}
