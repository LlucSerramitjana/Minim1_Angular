import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css']
})
export class EmployeeProfileComponent implements OnInit {
  employee: Employee | undefined;
  restaurants: [string] | undefined;
  title = "Employee Information";
  _id: string | null;

  constructor(private fb: FormBuilder, 
              private router: Router,
              private _employeeService: EmployeeService,
              private _restaurantService: RestaurantService,
              private aRouter: ActivatedRoute) {

  this._id = this.aRouter.snapshot.paramMap.get('_id');
  console.log(this._id);
}

  ngOnInit(): void {
    this.getEmployeeInfo();
  }

  getEmployeeInfo() {
    if(this._id !== null) {
      let namerest: string;

      this._employeeService.getEmployeebyID(this._id).subscribe(data => {
        this.employee = data;
        this.restaurants = [''];
        this.restaurants.pop();
       
        data.listRestaurants.forEach(rest => {
          this._restaurantService.getRestaurantbyID(rest._id).subscribe(data => {
            namerest = data.restaurantName;
            this.restaurants?.push(namerest);
          })
        })
        console.log(this.restaurants);
      })
    }
  }
}
