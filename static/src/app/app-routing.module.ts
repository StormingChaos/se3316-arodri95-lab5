import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//add components
import { HomepageComponent } from './homepage/homepage.component';
import { CoursesComponent } from './courses/courses.component';
import { SchedulesComponent } from './schedules/schedules.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'schedules', component: SchedulesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }