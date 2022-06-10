import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IEmployee } from '../interfaces/iemployee';
import { EmployeeService } from '../services/employee.service';  // import service

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  // data:IEmployee[] = [
  //   {id:1,first_name:"Michelle",last_name:"Chew", department:"Markering", salary:60000},
  //   {id:2,first_name:"Nichole",last_name:"Chew", department:"Markering", salary:60000},
  //   {id:3,first_name:"Amy",last_name:"See", department:"Markering", salary:60000},
  //   {id:4,first_name:"David",last_name:"Chew", department:"Markering", salary:60000},
  //   {id:5,first_name:"Jason",last_name:"Yap", department:"Markering", salary:60000},
    
  // ]

  public employees: any;
  public errorMsg: any;

  constructor(public empService: EmployeeService, private router: Router) { } // inject the service by creating an instance of it 

  ngOnInit(): void {
    // this.employees = this.empService.getEmployees();
    // this.empService.getAllEmployees().subscribe(
    //   (data) => {this.employees = data;
    //     console.log(data)},
    //     (error) => this.errorMsg = error,
    //     () => console.log("Completed")
    // )
    this.empService.getAllEmployees().subscribe(
      {
        next: (data: any) => {
          this.empService.empData = data;
        },
        error: () => {alert("There is something wrong!")}
      }
    )
  }

  // another method to replace routeLink
  onSelect(employees: any){
    this.router.navigate(['/employee-detail', employees.id])
  }

  createEmployee(employee: IEmployee){
    let temp:IEmployee = {
      id: employee.id,
      first_name: employee.first_name,
      last_name: employee.last_name,
      department: employee.department,
      salary: employee.salary
    }
    this.empService.createEmployee(temp).subscribe(
      {
        next:() => {
          this.empService.addRow(temp);
        },
        error:() => {alert("There is something wrong!")}
      }
      
    )
  }

  viewEmployee(id: number){
    this.empService.getOneEmployee(id).subscribe(
      {
        next: (data:any) => {
          this.empService.viewRow(data)
        }, 
        error: () => {alert("There is something wrong!")}
      }
    )
  }

  editEmployee(employee: any){
    this.router.navigate(['/editemployee', employee.id]);
  }

  updateEmployee(employee: IEmployee){
    let temp: IEmployee = {
      id: employee.id,
      first_name: employee.first_name,
      last_name: employee.last_name,
      department: employee.department,
      salary: employee.salary
    }

    this.empService.updateEmployee(employee.id, temp).subscribe(
      {
        next:() => {
          this.empService.updateRow(employee.id, temp);
        },
        error:() => {alert("There is something wrong!")}
      }
    )
  }

  deleteEmployee(id: number){
    let c = confirm("Are you sure you want to delete the data?")
    if(c){
      this.empService.deleteEmployee(id).subscribe(
        {
          next: () => {
            alert("You have successfully deleted an employee data")
            this.empService.deleteRow(id);
          },
          error: () => {alert("There is something wrong!")}
        }
      )
    }

  }
  
  deleteeEmployee(id: number){
    this.empService.deleteEmployee(id).subscribe(() => {
      this.empService.getAllEmployees().subscribe(
        {
          next: (data: any) => {
            this.employees = data
          },
          error: () => {alert("There is an issue with deleting employee data")}
        }

      )
    })
  }

}
