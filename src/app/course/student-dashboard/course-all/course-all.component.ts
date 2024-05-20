import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StudentService } from 'src/app/services/StudentService/student.service';

@Component({
  selector: 'app-course-all',
  templateUrl: './course-all.component.html',
  styleUrls: ['./course-all.component.scss']
})
export class CourseAllComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  userId = localStorage.getItem('currentUserId');
  userDetails = JSON.parse(localStorage.getItem('currentUser'))
  courseData = [];
  addEnq : FormGroup;
  viewCourseDataShow = false
  displayedColumns = ['title', 'category', 'level', 'courseStartDate', 'courseEndDate', 'action'];
  dataSource: MatTableDataSource<any>;
  viewCourseData: any;
  isEdit = false;
  submitted =false
  courseID;
  selectedTab = 'tab1';
  isShowEnq = false
  constructor( private studentService: StudentService,
    private formBuilder: FormBuilder,
  ) { 
    this.dataSource = new MatTableDataSource(this.courseData);
    this.addEnq =  this.formBuilder.group({
      subject: ['', Validators.required],
      message: ['', Validators.required],  
    })
  }

  ngOnInit(): void {
    this.getAllCourse();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  getAllCourse() {
    this.studentService.getAllCourse().subscribe((res: any) => {
      if (res) {
        // this.add()
        this.courseData = res.courses;        ;
        this.dataSource.data = this.courseData;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }

  enqShow(){
    this.isShowEnq = true;
  }
  close(){
    this.isShowEnq = false;
  }
  addEnquiries(){
    this.submitted = true
    if(this.addEnq.invalid){
      return
    }
    let json = {
     "courseId":this.courseID,
      "subject":this.addEnq.controls.subject.value,
      "message":this.addEnq.controls.message.value,
    }
    this.studentService.addEndbyCouId(json).subscribe((res=>{
      if(res){
        this.isShowEnq = false;
      }
    }))
  }
  // add(){
  //   let json={
  //     "courseId":"664a524ecdc4983423893939",
  //     "enrollmentDate":"2024-11-09",
  //     "userId":"664887a441927e851a344fb4"
  //   }
  //   this.studentService.add(json).subscribe((res: any) => {
  //     if (res) {
       
  //     }
  //   })
  // }
  viewCourse(data: any) {
    this.viewCourseDataShow = true;
    this.viewCourseData = data;
    this.courseID = data._id;
    setTimeout(() => {
      let element = document.getElementById('viewCourse');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
