import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginRegService } from '../services/Login/login-reg.service';



@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private loginRegService: LoginRegService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if ([401, 403].includes(err.status) && this.loginRegService.currentUser) {
                // auto logout if 401 or 403 response returned from api
                localStorage.clear();
                location.reload()
            }

            const error = err.error?.message || err.statusText;
            console.error(err);
            return throwError(() => error);
        }))
    }
}