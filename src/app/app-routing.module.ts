import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './home/login/login.component';
import { DashboardComponent } from './course/dashboard/dashboard.component';
import { StudentDashboardComponent } from './course/student-dashboard/student-dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'student_dashboard', component: StudentDashboardComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
