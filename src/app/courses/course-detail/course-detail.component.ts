import { Course } from './../course.model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CoursesService } from './../courses.service';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/user/user.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {
  public course: Course;
  public Editor: typeof ClassicEditor;
  isEdit: boolean;
  public courseId: string;
  isLoading: boolean;
  userListenerSubs: Subscription;
  userId: string;
  isValid: boolean;
  addLecture: boolean;
  public currentLecture: any;
  constructor(
    private route: ActivatedRoute,
    public coursesService: CoursesService,
    private router: Router,
    public userService: UserService
  ) {}

  saveEditedLecture(lectureId) {
    this.isEdit = false;
    const index = this.course.lecture.findIndex(
      lecture => lecture.lectureId === lectureId
    );
    this.course.lecture[index].lectureBody = this.currentLecture.lectureBody;

    this.updateCourse();
  }
  createLecture(lectureName) {
    this.course.lecture.push({
      lectureId: null,
      lectureName,
      lectureBody: 'demo lecture body'
    });
    this.updateCourse();
  }
  deleteLecture(lectureId) {
    const index = this.course.lecture.findIndex(
      lecture => lecture.lectureId === lectureId
    );
    this.course.lecture.splice(index, 1);
    this.currentLecture = this.course.lecture[0];
    this.updateCourse();
  }
  updateCourse() {
    this.coursesService.updateCourse(this.course);
  }
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
  getCourseDetail() {
    this.route.paramMap.subscribe(params => {
      this.courseId = params.get('courseId');
      this.coursesService.getCourseDetail(this.courseId).subscribe(
        value => {
          const lectures: Array<{
            lectureId: string;
            lectureName: string;
            lectureBody: string;
          }> = value.course.lecture.map(lecture => {
            return {
              lectureId: lecture._id,
              lectureName: lecture.lectureName,
              lectureBody: lecture.lectureBody
            };
          });
          const course: any = {
            courseId: value.course._id,
            courseName: value.course.courseName,
            courseDetails: value.course.courseDetails,
            lecture: lectures,
            creator: value.course.creator
          };
          this.course = course;
          if (this.course === undefined) {
            this.router.navigate(['error']);
          } else {
            this.currentLecture = this.course.lecture[0];
          }
        },
        err => {
          this.router.navigate(['error']);
        }
      );
    });
  }
  ngOnInit() {
    this.Editor = ClassicEditor;
    this.isEdit = false;
    this.addLecture = false;
    this.isLoading = true;
    this.userId = this.userService.getUserId();
    this.isValid = this.userService.isUserAuthenticated();
    this.userListenerSubs = this.userService
      .getUserStatusListener()
      .subscribe(isValid => {
        this.isValid = isValid;
        this.userId = this.userService.getUserId();
      });

    this.getCourseDetail();
    this.isLoading = false;
  }
}
