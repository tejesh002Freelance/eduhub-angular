import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialService } from 'src/app/services/material/material.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-enrollments',
  templateUrl: './enrollments.component.html',
  styleUrls: ['./enrollments.component.scss']
})
export class EnrollmentsComponent implements OnInit {
  enrollments = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  userId = localStorage.getItem('currentUserId');
  viewenrollDataShow = false
  displayedColumns = [ 'status', 'enrollmentDate','action'];
  dataSource: MatTableDataSource<any>;
  viewenrollData: any;
  isEdit = false;
  submitted =false
  courseID;
  selectedTab = 'tab1';
  isShowEnq = false
  constructor(public materialService: MaterialService,) {
    this.dataSource = new MatTableDataSource(this.enrollments);
   }

  ngOnInit(): void {
    this.getEnroll()
  }
  getEnroll(){
    this.materialService.getALlEnrollments().subscribe((res:any)=>{
      this.enrollments = res.enrollments;
      this.dataSource.data = this.enrollments;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
     });
  }

  approveStatus(data){
    Swal.fire({
      title: 'Are you sure you want to Approve it?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Approve it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.materialService.approveEnrollments(data._id).subscribe((res: any) => {
          if (res) {
            this.getEnroll()
          }
        })
      }
    })
  }
  rejectStatus(data){
    Swal.fire({
      title: 'Are you sure you want to reject it?',
      // text: 'You will not be able to recover this course!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, reject it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.materialService.rejectEnrollments(data._id).subscribe((res: any) => {
          if (res) {
            this.getEnroll()
            // this.getAllMaterial(this.courseID);
            // this.viewMaterialFormData = false;
          }
        })
      }
    })
  }
}
