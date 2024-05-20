import { Component, OnInit, ViewChild } from '@angular/core';
import { tick } from '@angular/core/testing';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StudentService } from 'src/app/services/StudentService/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  displayedColumns = ['_id', 'username', 'mobileNumber', 'email','createdAt'];
  dataSource: MatTableDataSource<any>;
  viewCourseData: any;
  allStudent = [];
  viewCourseDataShow = false
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private studentService: StudentService,) {
    this.dataSource = new MatTableDataSource(this.allStudent)
   }

  ngOnInit(): void {
    this.getStudent()
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  getStudent(){
    this.studentService.getAllStudent().subscribe((res:any)=>{
      if(res){
        this.allStudent = res?.users;
        this.dataSource.data = this.allStudent;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }
  
}