import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './home/login/login.module';
import { DashboardComponent } from './course/dashboard/dashboard.component';
import { StudentDashboardComponent } from './course/student-dashboard/student-dashboard.component';

@NgModule({
  declarations: [AppComponent, DashboardComponent, StudentDashboardComponent],
  imports: [BrowserModule, LoginModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
