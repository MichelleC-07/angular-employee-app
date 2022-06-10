import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employeedetails',
  templateUrl: './employeedetails.component.html',
  styleUrls: ['./employeedetails.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  public employeeID: any;
  public employee: any;
  public errorMsg: any;


  constructor(private actRouter: ActivatedRoute, private empService: EmployeeService, private router: Router) { }

  // paramMap returns an observer
  ngOnInit(): void {
    this.actRouter.paramMap.subscribe((params: ParamMap) => {
      // console.log(params.get('id))
      let id = params.get('id');  // get request to get the id from the URL
      console.log(id)
      this.employeeID = id;
      console.log(this.employeeID);
    });

    this.empService.getOneEmployee(this.employeeID).subscribe(
      {
        next: (data) => {
          this.employee = data
          console.log(data);
        },
        error: () => {alert("Failed to get employee by ID")}
      }
    )
  }

  prevPage(){
    this.router.navigate(['/employee-list']);
  }

}
