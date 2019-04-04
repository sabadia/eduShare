import { Course } from './../course.model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CoursesService } from './../courses.service';
import { Lecture } from '../lecture.model';
@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {
  public course: Course;
  public courseId: string;
  public currentLecture: Lecture;
  constructor(
    private route: ActivatedRoute,
    public coursesService: CoursesService,
    private router: Router
  ) {}

  onClickView(lectureId: string) {
    const data = this.course.lecture.find(
      lecture => lecture.lectureId === lectureId
    );
    if (data === undefined) {
      this.currentLecture = this.course.lecture[0];
    } else {
      this.currentLecture = data;
    }
  }
  ngOnInit() {
    this.route.paramMap.subscribe(
      params => (this.courseId = params.get('courseId'))
    );
    this.course = this.coursesService.getCourseDetail(this.courseId);
    this.currentLecture = this.course.lecture[0];
    console.log(this.course);
    if (this.course === undefined) {
      this.router.navigate(['error']);
    }
  }
}
