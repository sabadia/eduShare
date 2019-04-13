import { Course } from './../course.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CoursesService } from '../courses.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';
@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit, OnDestroy {
  public courses: Course[] = [];
  public subscription: Subscription;
  private userListenerSubs: Subscription;
  isValid: boolean;
  isLoading: boolean;
  userId: string;
  constructor(
    public coursesService: CoursesService,
    private router: Router,
    public userService: UserService
  ) {}

  goToCourseDetail(course: Course) {}
  onDeleteCourse(courseId: string) {
    this.coursesService.deleteCourse(courseId);
    this.router.navigate(['courses']);
  }
  ngOnInit() {
    this.userId = this.userService.getUserId();
    this.isLoading = true;
    this.coursesService.getCourses();
    this.subscription = this.coursesService
      .getCourseUpdatedListener()
      .subscribe((courses: Course[]) => (this.courses = courses));
    this.isValid = this.userService.isUserAuthenticated();
    this.userListenerSubs = this.userService
      .getUserStatusListener()
      .subscribe(isValid => {
        this.isValid = isValid;
        this.userId = this.userService.getUserId();
      });
    this.isLoading = false;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.userListenerSubs.unsubscribe();
  }
}
