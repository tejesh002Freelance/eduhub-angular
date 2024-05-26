import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LoginRegService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  public get currentUserValue() {
    return this.currentUserSubject.value;
  }
  // login api
  login(request): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/user/login`, request).pipe(map(user => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('currentUser', JSON.stringify(user.user));
      localStorage.setItem('currentUserId',user.user._id);
      localStorage.setItem('token', user.token)
      this.currentUserSubject.next(user);
      return user;
    }));
  }

  registration(request): Observable<any> {
    return this.http.post(`${environment.apiUrl}/user/register`, request);
  }
}