import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AuthModule } from '@auth0/auth0-angular';

import { AppComponent } from './app.component';
import { CoursesComponent } from './courses/courses.component';
import { SchedulesComponent } from './schedules/schedules.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PoliciesComponent } from './policies/policies.component';
import { AuthButtonComponent } from './auth-button/auth-button.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    SchedulesComponent,
    HomepageComponent,
    PoliciesComponent,
    AuthButtonComponent,
    UserProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AuthModule.forRoot({
      domain: 'dev-qje5xl60.us.auth0.com',
      clientId: 'c5FWYr8XezaDmzyqcaMsn1g5F04bR54z'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
