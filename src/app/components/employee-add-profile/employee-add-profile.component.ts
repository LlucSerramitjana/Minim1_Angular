import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-add-profile',
  templateUrl: './employee-add-profile.component.html',
  styleUrls: ['./employee-add-profile.component.css']
})
export class EmployeeAddProfileComponent implements OnInit {
  employee: Employee | undefined;
  employeeForm: FormGroup;
  title = "Employee Information";
  _id: string | null;

  constructor(private fb: FormBuilder, 
              private router: Router,
              private _employeeService: EmployeeService,
              private aRouter: ActivatedRoute) { 
    this.employeeForm = this.fb.group({
      _id: [''],
      employeeName: ['', Validators.required],
      fullName: ['', Validators.required],
      email: ['', Validators.required],
      listRestaurants: [{
        _id: [],
      }],
      password: ['', Validators.required],
      salary: ['', Validators.required],
      creationDate: [''],
    });

    this._id = this.aRouter.snapshot.paramMap.get('_id');
    console.log(this._id);
  }

  ngOnInit(): void {
    this.getEmployeeInfo();
  }

  addEmployee() {
    const employee: Employee = {
      _id: this.employeeForm.get('_id')?.value,
      employeeName: this.employeeForm.get('employeeName')?.value,
      fullName: this.employeeForm.get('fullName')?.value,
      email: this.employeeForm.get('email')?.value,
      listRestaurants: this.employeeForm.get('listRestaurants')?.value,
      password: this.employeeForm.get('password')?.value,
      salary: this.employeeForm.get('salary')?.value,
      creationDate: this.employeeForm.get('creationDate')?.value,
    }
    
    if (this._id !== 'add-owner' && this._id !== null) {
      this._employeeService.updateEmployee(employee.employeeName, employee).subscribe(data => {
        this.router.navigate(['/list-owners/', employee._id])
      }, error => {
        console.log(error);
        this.employeeForm.reset();
      })
    }

    else {
      console.log(employee);
      this._employeeService.addEmployee(employee).subscribe(data => {
        this.router.navigate(['/list-employee']);
      }, error => {
        console.log(error);
        this.employeeForm.reset();
      })
    }
  }

  getEmployeeInfo() {
    if(this._id !== null) {
      this.title = "Editable Information";
      this._employeeService.getEmployeebyID(this._id).subscribe(data => {
        this.employee = data;
        this.employeeForm.setValue({
          _id: data._id,
          ownerName: data.employeeName,
          fullName: data.fullName,
          email: data.email,
          listRestaurants: data.listRestaurants,
          password: data.password,
          salary: data.salary,
          creationDate: data.creationDate,
        })
      })
    }
  }

  deleteEmployee() {
    if(confirm("Are you sure to delete the owner?")) {
      if (this._id !== null) {
        this._employeeService.deleteEmployee(this._id).subscribe(data => {
          console.log("User deleted");
        }, error => {
          console.log(error);
        });
      }
    }
    else {
      this.router.navigate(['/list-employee', this._id]);
    }
  }
}

