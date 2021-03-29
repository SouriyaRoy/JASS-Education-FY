import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherCoordinatorComponent } from './teacher-coordinator.component';

describe('TeacherCoordinatorComponent', () => {
  let component: TeacherCoordinatorComponent;
  let fixture: ComponentFixture<TeacherCoordinatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherCoordinatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherCoordinatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
