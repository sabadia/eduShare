import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { MyCoursesComponent } from './my-courses/my-courses.component';
import { MyRegisteredCoursesComponent } from './my-registered-courses/my-registered-courses.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MatStepperModule } from '@angular/material/stepper';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  MatFormFieldModule,
  MatInputModule,
  MatGridListModule,
  MatExpansionModule,
  MatListModule,
  MatCardModule,
  MatButtonModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { EditCourseComponent } from './edit-course/edit-course.component';

@NgModule({
  declarations: [
    CoursesListComponent,
    MyCoursesComponent,
    MyRegisteredCoursesComponent,
    CreateCourseComponent,
    CourseDetailComponent,
    EditCourseComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    CKEditorModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatExpansionModule,
    MatListModule,
    MatProgressSpinnerModule,
    FormsModule
  ]
})
export class CoursesModule {}
