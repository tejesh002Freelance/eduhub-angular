import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './home/login/login.module';
import { DashboardComponent } from './course/dashboard/dashboard.component';
import { StudentDashboardComponent } from './course/student-dashboard/student-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './helpers/New folder/jwt.interceptor';
import { CourseComponent } from './course/student-dashboard/course/course.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { CommonModule, DatePipe } from '@angular/common';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import { MaterialComponent } from './course/student-dashboard/material/material.component';
import { StudentComponent } from './course/student-dashboard/student/student.component';
import {MatTabsModule} from '@angular/material/tabs';
import { EnrollmentsComponent } from './course/student-dashboard/enrollments/enrollments.component';
import { CourseAllComponent } from './course/student-dashboard/course-all/course-all.component';
import { EnquiryComponent } from './course/student-dashboard/enquiry/enquiry.component';
import { AllEnquiryComponent } from './course/student-dashboard/all-enquiry/all-enquiry.component';
import { ErrorInterceptor } from './helpers/error.interceptor';
@NgModule({
  declarations: [AppComponent, DashboardComponent, StudentDashboardComponent,  CourseComponent, MaterialComponent, StudentComponent, EnrollmentsComponent, CourseAllComponent, EnquiryComponent, AllEnquiryComponent,],
  imports: [BrowserModule ,
    LoginModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule, 
    MatInputModule,
    MatDatepickerModule,
     MatNativeDateModule,
     MatSnackBarModule,
     MatSortModule,
     MatTableModule,
     MatPaginatorModule,
     MatIconModule,
     CommonModule,
     MatTabsModule
   ],
  providers: [DatePipe,{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }