import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  courseID 
  constructor(private http: HttpClient) { }
  
  getAllStudent(){
    return this.http.get(`${environment.apiUrl}/user/getAllStudents`);
  }
  add(request){
    return this.http.post(`${environment.apiUrl}/enroll/addEnroll`,request);
  }
  getAllCourse():Observable<any>{
    return this.http.get(`${environment.apiUrl}/course/getAllCourses`);
  }

  addEndbyCouId(request):Observable<any>{
    return this.http.post(`${environment.apiUrl}/enquiry/addEnquiry`,request);
  }
  getCourseByUserId(id):Observable<any>{
    return this.http.get(`${environment.apiUrl}/course/getCourseByUserId/${id}`);
  }
  courserData(request,id,edit):Observable<any>{
    if(edit == false){
      return this.http.post(`${environment.apiUrl}/course/addCourse`,request);
    }else {
      return this.http.put(`${environment.apiUrl}/course/getCourseById/${id}`,request);
    }
 }
  
  coursegetByID(id):Observable<any>{
    return this.http.get(`${environment.apiUrl}/course/getCourseById/${id}`);
  }
  deletCourse(id):Observable<any>{
    return this.http.delete(`${environment.apiUrl}/course/getCourseById/${id}`);
  }

  getAllEnquiryDataByUserId(id):Observable<any>{
    return this.http.get(`${environment.apiUrl}/enquiry/getEnquiryByUserId/${id}`);
  }
  getAllEnquiryDataByCourseId(id):Observable<any>{
    return this.http.get(`${environment.apiUrl}/enquiry/getEnquiryByCourseId/${id}`);
  }
  changeEnqbyID(request,id){
    return this.http.post(`${environment.apiUrl}/enquiry/changeStatus/${id}`,request);
    
  }
}