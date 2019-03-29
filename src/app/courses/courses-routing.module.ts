import { CreateCourseComponent } from './create-course/create-course.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyCoursesComponent } from './my-courses/my-courses.component';
import { MyRegisteredCoursesComponent } from './my-registered-courses/my-registered-courses.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
const routes: Routes = [
  {
    path: 'my-courses/:id',
    component: MyCoursesComponent
  },
  {
    path: 'my-registered-courses/:id',
    component: MyRegisteredCoursesComponent
  },
  {
    path: 'create-course',
    component: CreateCourseComponent
  },
  {
    path: '',
    component: CoursesListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
