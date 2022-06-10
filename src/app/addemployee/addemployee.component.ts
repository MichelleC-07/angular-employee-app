import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  employees: any
  errorMsg: any;

  constructor(private empService: EmployeeService, private router: Router) { }

  public empModel = new Employee()  // then perform two-way binding with ngForm

  ngOnInit(): void {
  }

  onSubmit(empForm: any){
    console.log(this.empModel);
    this.empService.createEmployee(this.empModel).subscribe(
      {
        next:(data) => {
          this.employees = data;
          this.empService.getAllEmployees().subscribe(
            {
              next:(data) => {
                this.employees = data
              },
              error: (error) => this.errorMsg = error

            }
          )
        },
        error: (error) => this.errorMsg = error
      }
    )
    this.router.navigate(['/employee-list'])
  }

}
