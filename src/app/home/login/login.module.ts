import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule],
  declarations: [LoginComponent],
  exports: [LoginComponent],
})
export class LoginModule {}
