import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';
import { ParsedHostBindings } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  url = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  addEmployee(employee: Employee): Observable<string> {
    return this.http.post(this.url + '/employee', employee, {responseType: 'text'}) ;
  }

  getAllEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.url + '/employee');
  }

  getEmployeebyID(id: string): Observable<Employee> {
    return this.http.get<Employee>(this.url + '/employee/' + id);
  }

  getEmployeebyName(name: string): Observable<Employee> {
    return this.http.get<Employee>(this.url + '/employee/name/' + name);
  }

  updateEmployee(name: string, employee: Employee): Observable<string> {
    return this.http.put(this.url + '/employee/' + name, employee, {responseType: 'text'});
  }

  deleteEmployee(id: string): Observable<string> {
    return this.http.delete(this.url + '/employee/' + id, {responseType: 'text'})
  }
}
