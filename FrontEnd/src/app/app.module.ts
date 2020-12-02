import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CoursesComponent } from './courses/courses.component';
import { SchedulesComponent } from './schedules/schedules.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PoliciesComponent } from './policies/policies.component';

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    SchedulesComponent,
    HomepageComponent,
    PoliciesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
