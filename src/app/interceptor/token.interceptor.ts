import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpHeaders,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const accessToken = sessionStorage.getItem("access_token");

        if (
            req.url.includes('/user/login') ||
            req.url.includes('/user/register')
        ) {
            return next.handle(req);
        }

        const authReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        return next.handle(authReq).pipe(
            catchError(error => {
                return throwError(error);
            })
        );
    }
}
