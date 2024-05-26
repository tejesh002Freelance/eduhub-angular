import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    RouterModule,  
    FormsModule,
    CommonModule,
    ReactiveFormsModule,],
  declarations: [LoginComponent],
  exports: [LoginComponent],
})
export class LoginModule {}
