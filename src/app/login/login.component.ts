import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthGuardService } from '../services/authservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public invalidCredentialMsg: string | undefined;
  public username: string | undefined;
  public password: string | undefined;
  public retUrl: string | null = "employee-list";  // home url

  constructor(private authService: AuthGuardService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    
  }

  onFormSubmit(loginForm: any){
    this.authService.login(loginForm.value.username, loginForm.value.password).subscribe({
      next:(data:any) => {
        console.log(data)
        console.log(data['accessToken'])
        localStorage.setItem('token', data['access']) //var token will be populate with data object that contains accessToken
        this.router.navigate([this.retUrl]);
      },error:(err) => {
        alert("Login failed!");
        this.router.navigate(['home']);
      }
    });
    
  }

   
  // onFormSubmit(loginForm: any){
  //   this.authService.login(loginForm.value.userName, loginForm.value.password).subscribe(data => {
  //   console.log('return to' + this.retUrl);
  //   console.log(this.retUrl)
  //   if (this.retUrl != null){
  //     this.router.navigate([this.retUrl]);
  //   }else{
  //     this.router.navigate(['home']);
  //   }
  //   });
    
  // }

}
