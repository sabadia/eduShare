import { Course } from './../course.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CoursesService } from '../courses.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit, OnDestroy {
  public courses: Course[] = [];
  public subscription: Subscription;
  constructor(public coursesService: CoursesService, private router: Router) {}

  goToCourseDetail(course: Course) {}
  onDeleteCourse(courseId: string) {
    this.coursesService.deleteCourse(courseId);
    this.router.navigate(['courses']);
  }
  ngOnInit() {
    this.coursesService.getCourses();
    this.subscription = this.coursesService
      .getCourseUpdatedListener()
      .subscribe((courses: Course[]) => (this.courses = courses));
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
