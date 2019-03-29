import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { MyCoursesComponent } from './my-courses/my-courses.component';
import { MyRegisteredCoursesComponent } from './my-registered-courses/my-registered-courses.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [CoursesListComponent,
     MyCoursesComponent,
      MyRegisteredCoursesComponent,
       CreateCourseComponent,
       CourseDetailComponent],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    CKEditorModule
  ]
})
export class CoursesModule { }
