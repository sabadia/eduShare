import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: './home/home.module#HomeModule'
  },
  {
    path: 'courses',
    loadChildren: './courses/courses.module#CoursesModule'
  },
  {
    path: 'user-detail',
    loadChildren: './user-detail/user-detail.module#UserDetailModule'
  },
  {
    path: 'logout',
    redirectTo: 'home',
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: ErrorComponent
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
