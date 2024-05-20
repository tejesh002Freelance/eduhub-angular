import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StudentService } from 'src/app/services/StudentService/student.service';

@Component({
  selector: 'app-all-enquiry',
  templateUrl: './all-enquiry.component.html',
  styleUrls: ['./all-enquiry.component.scss']
})
export class AllEnquiryComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  userId = localStorage.getItem('currentUserId');
  userDetails = JSON.parse(localStorage.getItem('currentUser'))
  enquiries = [];
  viewCourseDataShow = false
  displayedColumns = ['subject', 'status', 'enquiryDate','course', 'response'];
  dataSource: MatTableDataSource<any>;
  viewCourseData: any;
  isEdit = false;
  submitted = false
  courseID;
  selectedTab = 'tab1';
  isShowEnq = false
  constructor(private studentService: StudentService,) {
    this.dataSource = new MatTableDataSource(this.enquiries);
  }

  ngOnInit(): void {
    this.getAllEnquiry()
  }
  getAllEnquiry() {
    this.studentService.getAllEnquiryDataByUserId(this.userId).subscribe((res: any) => {
      this.enquiries = res.enquiries
      this.dataSource.data = this.enquiries;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
