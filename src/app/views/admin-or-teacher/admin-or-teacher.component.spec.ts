import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrTeacherComponent } from './admin-or-teacher.component';

describe('AdminOrTeacherComponent', () => {
  let component: AdminOrTeacherComponent;
  let fixture: ComponentFixture<AdminOrTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOrTeacherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
