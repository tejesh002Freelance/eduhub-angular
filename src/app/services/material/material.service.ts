import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  constructor(private http: HttpClient) { }
  getAllMaterial(id): Observable<any> {
    return this.http.get(`${environment.apiUrl}/material/getMaterialByCourseID/${id}`);
  }
  materialData(request, id, edit): Observable<any> {
    if (edit == false) {
      return this.http.post(`${environment.apiUrl}/material/addMaterial`, request);
    } else {
      return this.http.post(`${environment.apiUrl}/material/getMaterialByMaterialID/${id}`, request);
    }
  }
  deleteMaterial(id): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/material/getMaterialByMaterialID/${id}`);
  }
  getALlEnrollments(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/enroll/getAllEnrolls`);
  }
  approveEnrollments(id): Observable<any> {
    return this.http.post(`${environment.apiUrl}/enroll/approveEnrollByEnrollID/${id}`, { new: true });
  }
  rejectEnrollments(id): Observable<any> {
    return this.http.post(`${environment.apiUrl}/enroll/rejectEnrollByEnrollID/${id}`, { new: true });
  }
  getEnquiryByCourseId(id): Observable<any> {
    return this.http.get(`${environment.apiUrl}/enquiry/getEnquiryByCourseId/${id}`);
  }
}