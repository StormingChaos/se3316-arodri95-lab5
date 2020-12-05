import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//add components
import { HomepageComponent } from './homepage/homepage.component';
import { CoursesComponent } from './courses/courses.component';
import { SchedulesComponent } from './schedules/schedules.component';
import { PoliciesComponent } from './policies/policies.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'schedules', component: SchedulesComponent},
  { path: 'policies', component: PoliciesComponent},
  { path: 'profile', component: UserProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
