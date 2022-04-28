import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAddProfileComponent } from './employee-add-profile.component';

describe('EmployeeAddProfileComponent', () => {
  let component: EmployeeAddProfileComponent;
  let fixture: ComponentFixture<EmployeeAddProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeAddProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAddProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
