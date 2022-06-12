import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';

import { EmployeeService } from './services/employee.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { EmployeeDetailsComponent } from './employeedetails/employeedetails.component';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component'

import { MatCardModule } from '@angular/material/card'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './services/authservice.service';
import { AddEmployeeComponent } from './addemployee/addemployee.component';
import { UpdateEmployeeComponent } from './updateemployee/updateemployee.component';
import { HomeComponent } from './home/home.component';
import { InterceptorService } from './services/interceptor.service';
import { CreateAccComponent } from './createacc/createacc.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    EmployeeDetailsComponent,
    AddEmployeeComponent,
    PageNotFoundComponent,
    LoginComponent,
    UpdateEmployeeComponent,
    HomeComponent,
    CreateAccComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,

  ],
  providers: [EmployeeService, AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi:true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
