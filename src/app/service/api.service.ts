import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private baseUrl: string = environment.baseUrl

    constructor(private _httpClient: HttpClient) { }

    login(data: any): Observable<any> {
        return this._httpClient.post(`${this.baseUrl}/user/login`, data);
    }


    register(data: any): Observable<any> {
        return this._httpClient.post(`${this.baseUrl}/user/register`, data);
    }


    getRole(): Observable<any> {
        return this._httpClient.get(`${this.baseUrl}/user/me`);
    }
}