import { Component } from '@angular/core';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss'],
})
export class StudentDashboardComponent {
  public selectedTab: string = 'tab1';
  userDetails = JSON.parse(localStorage.getItem('currentUser'))

  constructor() {
    if (this.userDetails != 'Educator') {
      this.selectedTab = 'tab3'
    } else {
      this.selectedTab = 'tab1'
    }
  }

  logOut() {
    localStorage.clear();
    window.location.reload();
  }

  changeTab(tab: string) {
    this.selectedTab = tab;
  }

}