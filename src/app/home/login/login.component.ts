import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginRegService } from 'src/app/services/Login/login-reg.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public loginForm: FormGroup;
  registrationForm: FormGroup;
  selectedTab = 'tab-1'
  public submitted = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(private formBuilder: FormBuilder,
    public router: Router,
    public loginRegService: LoginRegService, private _snackBar: MatSnackBar) {
    this.loginForm = this.formBuilder.group({
      username: ["", [Validators.required]],
      password: [
        "", [
          Validators.required,
          
        ]
      ]
    });

    this.registrationForm = this.formBuilder.group({
      username: ["", [Validators.required]],
      email: ["", [Validators.email,Validators.required]],
      phoneNumber: ["", [Validators.required]],
      role: ["", [Validators.required]],
      profile: ["", [Validators.required]],
      password: [
        "", [
          Validators.required,
          Validators.pattern(
            "(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>\"'\\;:{\\}\\[\\]\\|\\+\\-\\=\\_\\)\\(\\)\\`\\/\\\\\\]])[A-Za-z0-9d$@].{7,}"
          )
        ]
      ]
    })
  }
  changeTab(tab: string) {
    this.selectedTab = tab;
    this.submitted = false
    this.loginForm.reset();
    this.registrationForm.reset();
   }
  goToDashboard() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return
    }
    let json = {
      'username': this.loginForm.controls.username.value,
      'password': this.loginForm.controls.password.value
    }
    this.loginRegService.login(json).subscribe((res: any) => {
      if(res.success == true){
        localStorage.setItem('token',res.token)
        localStorage.setItem('userId',res.token)
        this.router.navigate(['dashboard']);
      }else{
        this.loginForm.reset();
        this._snackBar.open(res.message, 'X', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
    },error => {
      if(error){
        this.loginForm.reset();
        this.submitted = false;
        this._snackBar.open('Invalid Credentials', 'X', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
      console.log(error.status); // This comes back with 200 !!!!!!!!
  })
   
  }
  handleFileInput(files: FileList) {
    // this.fileToUpload = files.item(0);
  }
  registrationUser(){
    this.submitted = true;
    if (this.registrationForm.invalid) {
      return
    }
    let json = {
      'username': this.registrationForm.controls.username.value,
      'password': this.registrationForm.controls.password.value,
      'role':this.registrationForm.controls.role.value,
      'email':this.registrationForm.controls.email.value,
      'mobileNumber':this.registrationForm.controls.phoneNumber.value,
      'profileImage':this.registrationForm.controls.profile.value,
    }
    this.loginRegService.registration(json).subscribe((res : any)=>{
      if(res.success == true){
        this.selectedTab = 'tab-1';
        this.submitted = false;
        this.loginForm.reset();
        this._snackBar.open('User Successfully Registered', 'X', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        // this.router.navigate(['dashboard']);
      }
    },error => {
      if(error){
        this.registrationForm.reset();
        this.submitted = false;
        this._snackBar.open('User already exists.', 'X', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
      console.log(error.status); // This comes back with 200 !!!!!!!!
  })
  }
}