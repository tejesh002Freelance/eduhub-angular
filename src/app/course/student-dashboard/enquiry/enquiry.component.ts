
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StudentService } from 'src/app/services/StudentService/student.service';

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.scss']
})
export class EnquiryComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  addEnq : FormGroup;
  userId = localStorage.getItem('currentUserId');
  userDetails = JSON.parse(localStorage.getItem('currentUser'))
  enquiries = [];
  viewCourseDataShow = false
  displayedColumns = ['subject', 'status', 'enquiryDate','course', 'response','action'];
  dataSource: MatTableDataSource<any>;
  viewCourseData: any;
  isEdit = false;
  submitted = false
  selectedTab = 'tab1';
  isShowEnq = false;
  enqID 
  @Input() courseID: any;
  constructor(private studentService: StudentService,  private formBuilder: FormBuilder,) {
    this.dataSource = new MatTableDataSource(this.enquiries);
  }

  ngOnInit(): void {
    this.getAllEnquiry();
    this.addEnq =  this.formBuilder.group({
      reason: ['', Validators.required],
    })
  }
  getAllEnquiry() {
    this.studentService.getAllEnquiryDataByCourseId(this.courseID).subscribe((res: any) => {
      this.enquiries = res.enquiries
      this.dataSource.data = this.enquiries;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  close(){
    this.isShowEnq = false;
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  viewEnq(data){
    this.enqID = data._id
    this.isShowEnq = true;
  }
  changeStatus(){
    this.submitted = true
    if(this.addEnq.invalid){
      return
    }
    let json = {
      "reason":this.addEnq.controls.reason.value,
      }
    this.studentService.changeEnqbyID(json,this.enqID).subscribe((res=>{
      if(res){
        this.isShowEnq = false;
      }
    }))
  }
}
