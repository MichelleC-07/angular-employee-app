import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-updateemployee',
  templateUrl: './updateemployee.component.html',
  styleUrls: ['./updateemployee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  public employeeId: any;
  public employee: any;
  public errorMsg: any;

  constructor(private empService: EmployeeService, private actRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');
      console.log(id)
      this.employeeId = id;
      console.log(this.employeeId);
    });
    this.employee = this.empService.getOneEmployee(this.employeeId).subscribe(
      {
        next:(data) => {this.employee = data;},
        error: (error) => {this.errorMsg = error;}
      }
    );
   
  }

  update(employeeId: any, employee: any){
    this.empService.updateEmployee(this.employeeId, this.employee).subscribe(
      {
        next:(data) => {this.employee = data;
          this.empService.getAllEmployees().subscribe(
            {
              next:(data) => {this.employee = data},
              error:(error) => {this.errorMsg = error}
            }
          )
        },
        error:(error) => {this.errorMsg = error}
      }
    );
    this.router.navigate(['/employee-list'])
  }

}
