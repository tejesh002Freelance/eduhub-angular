import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StudentService } from 'src/app/services/StudentService/student.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  userId = localStorage.getItem('currentUserId');
  courseForm: FormGroup;
  submitted = false;
  courseData = []
  viewCourseDataShow = false
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  displayedColumns = ['title', 'category', 'level', 'courseStartDate', 'courseEndDate', 'action'];
  dataSource: MatTableDataSource<any>;
  viewCourseData: any;
  isEdit = false;
  courseID;
  selectedTab = 'tab1';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  userDetails = JSON.parse(localStorage.getItem('currentUser'))
  constructor(private formBuilder: FormBuilder,
    private studentService: StudentService,
    public datePipe: DatePipe,
    private _snackBar: MatSnackBar) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.courseData)
    this.courseForm = this.formBuilder.group({
      title: ['', Validators.required],
      courseStartDate: ['', Validators.required],
      courseEndDate: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      level: ['', Validators.required]
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
    this.studentService.getCourseByUserId(this.userId).subscribe((res: any) => {
      if (res) {
        this.courseData = res.courses;        ;
        this.dataSource.data = this.courseData;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }
  
  // add model open for is edit remove
  openModel() {
    this.viewCourseDataShow = false
    this.courseForm.reset();
    this.isEdit = false;
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  addCourseData() {
    this.submitted = true;
    if (this.courseForm.invalid) {
      return
    }
    let json = {
      "title": this.courseForm.controls.title.value,
      "description": this.courseForm.controls.description.value,
      "courseStartDate": this.datePipe.transform(new Date(this.courseForm.controls.courseStartDate.value), 'yyyy-MM-dd'),
      "courseEndDate": this.datePipe.transform(new Date(this.courseForm.controls.courseEndDate.value), 'yyyy-MM-dd'),
      "category": this.courseForm.controls.category.value,
      "level": this.courseForm.controls.level.value,
    }
    this.studentService.courserData(json, this.courseID, this.isEdit).subscribe((res: any) => {
      if (res.success) {
        if (this.isEdit !== false) {
          this._snackBar.open('Couser Successfully added', 'X', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
          this.getAllCourse();
        this.isEdit = false;
        this.viewCourseDataShow = false;
        this.courseForm.reset();
        } else {
          this._snackBar.open('Couser Successfully update', 'X', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
          this.getAllCourse();
        this.isEdit = false;
        this.viewCourseDataShow = false;
        this.courseForm.reset();
        }
        
      } else {
        this._snackBar.open('Couser is not added, please try again', 'X', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.getAllCourse();
        this.courseForm.reset();
        this.isEdit = false;
      }
    })
  }
  changeTab(tab: string) {
    this.selectedTab = tab;
    this.viewCourseData = [];
  }
  //  view button click view data
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

  //  edit click set data in form
  EditData(data) {
    this.viewCourseDataShow = false
    this.isEdit = true;
    this.courseID = data._id;
    this.studentService.courseID =data._id;
    this.courseForm.patchValue({
      title: data.title,
      description: data.description,
      courseStartDate: data.courseStartDate,
      level: data.level,
      category: data.category,
      courseEndDate: data.courseEndDate
    });
  }


  // delete course by id
  deleteCourse(data) {
    this.viewCourseDataShow = false
    Swal.fire({
      title: 'Are you sure you want to delete it?',
      text: 'You will not be able to recover this course!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.studentService.deletCourse(data._id).subscribe((res: any) => {
          if (res) {
            this.getAllCourse();
          }
        })
      }
    })
  }
}