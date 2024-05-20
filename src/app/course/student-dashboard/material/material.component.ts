import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StudentService } from 'src/app/services/StudentService/student.service';
import { MaterialService } from 'src/app/services/material/material.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss']
})
export class MaterialComponent implements OnInit {
  userId = localStorage.getItem('currentUserId');
  @Input() courseID: any;
  materialForm: FormGroup;
  submitted = false;
  materialData = []
  viewMaterialShow = false
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  displayedColumns = ['title', 'contentType', 'url', 'description', 'action'];
  dataSource: MatTableDataSource<any>;
  viewMaterialFormData: any;
  isEdit = false;
  materialID;
  selectedTab = 'tab1';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public materialService: MaterialService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource(this.materialData)
    this.materialForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      url: ['', Validators.required],
      contentType: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.getAllMaterial(this.courseID)
  }
  getAllMaterial(courseID) {
    this.materialService.getAllMaterial(courseID).subscribe((res: any) => {
      if (res) {
        this.materialData = res.materials;
        this.dataSource.data = res.materials;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }
  addCourseData() {
    this.submitted = true;
    if (this.materialForm.invalid) {
      return
    }
    let json = {
      "courseId":this.courseID,
      "title": this.materialForm.controls.title.value,
      "description": this.materialForm.controls.description.value,
      "url": this.materialForm.controls.url.value,
      "contentType": this.materialForm.controls.contentType.value,
    }
    this.materialService.materialData(json, this.courseID, this.isEdit).subscribe((res: any) => {
      if (res.success) {
        if (this.isEdit !== false) {
          this._snackBar.open('Material Successfully added', 'X', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });

          this.getAllMaterial(this.courseID)
          this.isEdit = false;
          this.viewMaterialShow = false;
          this.materialForm.reset();
        } else {
          this._snackBar.open('Material Successfully update', 'X', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });

          this.getAllMaterial(this.courseID)
          this.isEdit = false;
          this.viewMaterialShow = false;
          this.materialForm.reset();
        }

      } else {
        this._snackBar.open('Couser is not added, please try again', 'X', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.getAllMaterial(this.courseID)
        this.materialForm.reset();
        this.isEdit = false;
      }
    })
  }
  EditData(data) {
    this.viewMaterialShow = false
    this.isEdit = true;
    this.materialID = data._id;
    this.materialForm.patchValue({
      title: data.title,
      description: data.description,
      courseStartDate: data.courseStartDate,
      url: data.url,
      contentType: data.contentType,
    });
  }

  deleteMaterial(data){
    this.viewMaterialShow = false;
    Swal.fire({
      title: 'Are you sure you want to delete it?',
      text: 'You will not be able to recover this course!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.materialService.deleteMaterial(data._id).subscribe((res: any) => {
          if (res) {
            this.getAllMaterial(this.courseID);
            this.viewMaterialFormData = false;
          }
        })
      }
    })
  }
  openModel() {
    this.viewMaterialShow = false
    this.materialForm.reset(this.materialForm.value);
    this.isEdit = false;
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
