import { CreateCourseComponent } from './create-course/create-course.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyCoursesComponent } from './my-courses/my-courses.component';
import { MyRegisteredCoursesComponent } from './my-registered-courses/my-registered-courses.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
const routes: Routes = [
  {
    path: 'enrolled-courses',
    component: MyCoursesComponent
  },
  {
    path: 'my-courses',
    component: MyRegisteredCoursesComponent
  },
  {
    path: 'course-detail/:courseId',
    component: CourseDetailComponent
  },
  {
    path: 'create-course',
    component: CreateCourseComponent
  },
  {
    path: '',
    component: CoursesListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule {}
