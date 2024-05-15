import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  constructor(public router: Router, private apiService: ApiService, private toast: ToastService, private sanitizer: DomSanitizer) { }

  isLogin: boolean = true;

  loginReqObj = {
    username: null,
    password: null
  }

  regReqObj = {
    username: null,
    email: null,
    password: null,
    role: null,
    mobileNumber: null,
    profileImage: null
  }

  loginAndGoToDashboard() {
    const hasNullValue = Object.values(this.loginReqObj).some(value => value === null);
    if (!hasNullValue) {
      this.apiService.login(this.loginReqObj).subscribe(res => {
        console.log('login user res', res);
        // set token to the session storage as access_token
        if (res.success) {
          this.toast.success('Login successful');
          sessionStorage.setItem('access_token', res.token);

          setTimeout(() => {
            this.apiService.getRole().subscribe(ress => {
              console.log('dataaaa', res);
            }, err => {
              console.log('error', err);
            })

          }, 1000)

          if(res.user.role === 'Educator'){
            this.router.navigate(['educator'])
          } else {
            this.router.navigate(['student'])
          }
        }
      }, err => {
        console.log('login error', err);
        this.toast.error(err.error.message);
      });
    } else {
      this.toast.error('All fields are required!');
    }
  }

  // fileToBase64(fileInput) {
  //   console.log('fileToBase64', fileInput);
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       resolve(String(reader.result).split(',')[1]);
  //     };
  //     reader.onerror = (error) => {
  //       reject(error);
  //     };
  //     reader.readAsDataURL(fileInput[0]);
  //   });
  // }

  handleFileInput(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      // this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(base64String)
      this.regReqObj.profileImage = base64String
    };
    reader.readAsDataURL(file);
  }

  async registerUser() {
    const hasNullValue = Object.values(this.regReqObj).some(value => value === null);
    if (!hasNullValue) {
      console.log("image base64 string", this.regReqObj, this.regReqObj.profileImage);
      this.apiService.register(this.regReqObj).subscribe(res => {
        console.log('register user res', res);
        this.router.navigate(['login']);
        if(res.status){
          this.toast.success("User register Successfully")
        }
      }, err => {
        console.log('register error', err);
      });
    } else {
      this.toast.error('All fields are required!');
    }

  }
}
