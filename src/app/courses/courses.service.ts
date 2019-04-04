import { Course } from './course.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/Operators';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private courses: Course[] = [];
  private courseUpdated = new Subject<Course[]>();
  constructor(private http: HttpClient) {}

  getCourseUpdatedListener() {
    return this.courseUpdated.asObservable();
  }
  getCourses() {
    this.http
      .get<{ message: string; courses: any }>(
        'http://localhost:3000/api/courses'
      )
      .subscribe(courseData => {
        const courses = courseData.courses.map(course => {
          return {
            courseName: course.courseName,
            courseDetails: course.courseDetails,
            lecture: course.lecture,
            courseId: course._id
          };
        });
        this.courses = courses;
        console.log(this.courses);
        this.courseUpdated.next([...this.courses]);
      });
  }
  addCourse(course: Course) {
    this.http
      .post<{ message: string; courseId: string }>(
        'http://localhost:3000/api/courses',
        course
      )
      .subscribe(responseData => {
        console.log(responseData.message);
        course.courseId = responseData.courseId;
        this.courses.push(course);
        this.courseUpdated.next([...this.courses]);
      });
  }
  getCourseDetail(courseId: string) {
    return this.courses.find(course => course.courseId === courseId);
  }
  deleteCourse(courseId: string) {
    this.http
      .delete('http://localhost:3000/api/courses/' + courseId)
      .subscribe(() => {
        this.courses = this.courses.filter(
          course => course.courseId !== courseId
        );
        this.courseUpdated.next([...this.courses]);
      });
  }
}
