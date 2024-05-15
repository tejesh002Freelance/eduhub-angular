import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './course/dashboard/dashboard.component';
import { StudentDashboardComponent } from './course/student-dashboard/student-dashboard.component';
import { LoginComponent } from './home/login/login.component';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { HeaderComponent } from './header/header.component';
import { EducatorComponent } from './educator/educator.component';
import { StudentComponent } from './student/student.component';

@NgModule({
  declarations: [AppComponent, DashboardComponent, StudentDashboardComponent, LoginComponent, HeaderComponent, EducatorComponent, StudentComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule, BrowserAnimationsModule, ToastrModule.forRoot()],
  exports: [HttpClientModule, ToastrModule],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  },],
  bootstrap: [AppComponent],
})
export class AppModule { }
