import { CoursesService } from './../courses.service';
import { Course } from './../course.model';
import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss']
})
export class CreateCourseComponent implements OnInit {
  public Editor: typeof ClassicEditor;
  createCourseControl: FormGroup;
  createLectureControl: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public coursesService: CoursesService,
    private router: Router
  ) {}

  createCourse() {
    let lectureName: string = this.createLectureControl.value.lectureName;
    let lectureBody: string = this.createLectureControl.value.lectureBody;
    if (lectureName.trim() === '') {
      lectureName = 'demo lecture title';
    }
    if (lectureBody.trim() === '') {
      lectureBody = `<p>demo lecture body</p>`;
    }
    const course: Course = {
      courseId: null,
      courseName: this.createCourseControl.value.courseName,
      courseDetails: this.createCourseControl.value.courseDetails,
      lecture: [
        {
          lectureId: null,
          lectureName,
          lectureBody
        }
      ],
      creator: null
    };
    this.coursesService.addCourse(course);
    this.router.navigate(['courses']);
  }

  ngOnInit() {
    this.Editor = ClassicEditor;
    this.createCourseControl = this.formBuilder.group({
      courseName: ['', Validators.required],
      courseDetails: ['']
    });
    this.createLectureControl = this.formBuilder.group({
      lectureName: [''],
      lectureBody: ['']
    });
  }
}
