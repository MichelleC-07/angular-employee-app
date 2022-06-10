import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { HostListener } from '@angular/core';
import { AuthGuardService } from './services/authservice.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'employee-app';

  constructor (private authService: AuthGuardService, private router: Router){}

  opened = true;
  @ViewChild('sidenav', {static:true}) sidenav!: MatSidenav;
  
  ngOnInit() {
    console.log(window.innerWidth)
    if (window.innerWidth < 768) {
      this.sidenav.fixedTopGap = 64;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 64;
      this.opened = true;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    if (event.target.innerWidth < 768) {
      this.sidenav.fixedTopGap = 64;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 64;
      this.opened = true;
    }
  }

  isBiggerScreen() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width < 768) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    this.authService.logoutUser();
    alert("You have logged out")
    this.router.navigate(['home']);
  }
}

