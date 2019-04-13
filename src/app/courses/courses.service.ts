import { Course } from './course.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
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
            courseId: course._id,
            creator: course.creator
          };
        });
        this.courses = courses;
        this.courseUpdated.next([...this.courses]);
      });
  }
  getCourseDetail(courseId: string) {
    return this.http.get<{
      message: string;
      course: {
        _id: string;
        courseName: string;
        courseDetails: string;
        lecture: [
          {
            _id: string;
            lectureName: string;
            lectureBody: string;
          }
        ];
        creator: string;
      };
    }>('http://localhost:3000/api/courses/' + courseId);
  }
  updateCourse(course: Course) {
    this.http
      .put('http://localhost:3000/api/courses/' + course.courseId, course)
      .subscribe(response => console.log(response));
  }
  addCourse(course: Course) {
    this.http
      .post<{ message: string; courseId: string }>(
        'http://localhost:3000/api/courses',
        course
      )
      .subscribe(responseData => {
        course.courseId = responseData.courseId;
        this.courses.push(course);
        this.courseUpdated.next([...this.courses]);
      });
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
