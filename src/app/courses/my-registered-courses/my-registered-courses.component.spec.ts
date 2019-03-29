import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRegisteredCoursesComponent } from './my-registered-courses.component';

describe('MyRegisteredCoursesComponent', () => {
  let component: MyRegisteredCoursesComponent;
  let fixture: ComponentFixture<MyRegisteredCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyRegisteredCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyRegisteredCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
