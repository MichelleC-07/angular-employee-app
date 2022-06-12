import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './addemployee/addemployee.component';
import { CreateAccComponent } from './createacc/createacc.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeDetailsComponent } from './employeedetails/employeedetails.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';
import { RouteguardGuard } from './services/routeguard.guard';
import { UpdateEmployeeComponent } from './updateemployee/updateemployee.component';

// 1. configure route
// each route is an obj which contains path and component
const routes: Routes = [
  { path: "", redirectTo:"home",pathMatch:"full"},
  { path:"home",component: HomeComponent},
  { path: "login", component: LoginComponent},
  { path:"create-account", component: CreateAccComponent},
  { path: 'addemployee', component: AddEmployeeComponent, canActivate: [RouteguardGuard]},
  { path: "employee-list", component: EmployeeComponent, canActivate: [RouteguardGuard] },
  { path: "employee-detail/:id", component: EmployeeDetailsComponent, canActivate: [RouteguardGuard]},
  { path: "editemployee/:id", component: UpdateEmployeeComponent, canActivate: [RouteguardGuard]},
  { path: "**", component: PageNotFoundComponent },
];

// 2. register the route
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


// 3. bind route to html; routerLink = "/<path></path>"

// , canActivate: [RouteguardGuard]