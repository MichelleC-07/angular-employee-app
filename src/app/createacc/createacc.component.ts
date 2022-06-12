import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuardService } from '../services/authservice.service';

@Component({
  selector: 'app-createacc',
  templateUrl: './createacc.component.html',
  styleUrls: ['./createacc.component.css']
})
export class CreateAccComponent implements OnInit {

  constructor(private authService: AuthGuardService, private router: Router) { }

  ngOnInit(): void {
  }

  onFormSubmit(createAccForm: any){
    this.authService.createAccount(
      createAccForm.value.first_name,
      createAccForm.value.last_name,
      createAccForm.value.email,
      createAccForm.value.email,
      createAccForm.value.password).subscribe({
        next:(data:any) => {
          console.log(data)
          this.router.navigate(['employee-list']);
        },
        error:() => {
          alert("Create Account Failed");
          // this.router.navigate(['home']);
        }
      })
  }

}
