import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  listEmployee: Employee[] = [];

  constructor(private _employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getAllEmployee();
  }


  getAllEmployee() {
    this._employeeService.getAllEmployee().subscribe(data => {
      console.log(data);
      this.listEmployee = data;
    }, error => {
      console.log(error);
    })
  }
}

