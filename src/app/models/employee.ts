export class Employee {
    _id: string;
    employeeName: string;
    fullName: string;
    email: string;
    password: string;
    creationDate: Date;
    salary: Number;
    listRestaurants: [{
        _id: string;
        restName: string;
    }]; //Array containing the IDs of the restaurants.

    constructor(_id: string, name: string, fullName: string, email: string, pass: string, cDate: Date, cSalary: Number, listRest: [{_id: string, restName: string}]) {
        this._id = _id;
        this.employeeName = name;
        this.fullName = fullName;
        this.email = email;
        this.password = pass;
        this.creationDate = cDate;
        this.salary = cSalary;
        this.listRestaurants = listRest;
    }
}