import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  public tableContents = [
    {
      id: 1,
      isMaterial: true,
      trainer: 'Trainer 1',
      type: 'Drawing',
      duration: '15 days',
      title: 'The Ultimate Drawing course - Beginner to Advanced',
      description:
        'Drawing is a form of visual art in which an artist uses instruments to mark paper or other two-dimensional surface. Drawing instruments include graphite pencils, pen and ink, various kinds of paints, inked brushes, colored pencils, crayons, charcoal, chalk, pastels, erasers, markers, styluses, and metals.',
      date: '25/01/2024',
    },
    {
      id: 2,
      isMaterial: true,
      trainer: 'Trainer 2',
      type: 'Physics',
      duration: '1 month',
      title:
        'Structure of matter and how the fundamental constituents of the universe interact',
      description:
        'What is physics? Physics is the branch of science that deals with the structure of matter and how the fundamental constituents of the universe interact. It studies objects ranging from the very small using quantum mechanics to the entire universe using general relativity',
      date: '22/02/2024',
    },
    {
      id: 3,
      isMaterial: true,
      trainer: 'Trainer 3',
      type: 'Chemistry',
      duration: '15 days',
      title: 'Properties, composition, and structure of substances',
      description:
        'Chemistry is the branch of science that deals with the properties, composition, and structure of elements and compounds, how they can change, and the energy that is released or absorbed when they change.',
      date: '12/02/2024',
    },
    {
      id: 4,
      isMaterial: true,
      trainer: 'Trainer 4',
      duration: '1 month',
      type: 'Maths',
      title: 'Simple mathematics',
      description:
        'Mathematics is the science and study of quality, structure, space, and change. Mathematicians seek out patterns, formulate new conjectures, and establish truth by rigorous deduction from appropriately chosen axioms and definitions.',
      date: '15/02/2024',
    },
    {
      id: 5,
      isMaterial: false,
      trainer: 'Trainer 5',
      type: 'Computer',
      duration: '20 days',
      title: 'Arithmetic or logical operations (computation)',
      description:
        'What is a computer? A computer is a machine that can store and process information. Most computers rely on a binary system, which uses two variables, 0 and 1, to complete tasks such as storing data, calculating algorithms, and displaying information.',
      date: '02/02/2024',
    },
    {
      id: 6,
      isMaterial: true,
      trainer: 'Trainer 6',
      type: 'Social',
      duration: '1 month',
      title: 'Indian leaders',
      description:
        'Social Leadership is leadership beyond the system: a model of authority held in reputation, and deep interconnection. Whilst it may align with our formal hierarchies, which represent the codified lines of power and authority, most typically it will diverge',
      date: '12/02/2024',
    },
  ];

  public studentsCourseData = [
    {
      id: 1,
      studentName: 'Ajith',
      courseId: 1,
      enquiry: 'Test enquiry',
      requestDate: '25/01/2024',
    },
  ];

  public viewCourseData: any[] = [];
  public modifyCourseData: any[] = [];
  public viewEnquiryData: any[] = [];
  public selectedTab: string = 'tab1';

  public type: string = '';
  public title: string = '';
  public description: string = '';
  public duration: string = '';
  public showAdd = false;

  changeTab(tab: string) {
    this.selectedTab = tab;
    this.viewCourseData = [];
    this.modifyCourseData = [];
    this.viewEnquiryData = [];
  }

  viewCourse(id: any) {
    this.viewCourseData = this.tableContents.filter((x) => x.id === id);
    setTimeout(() => {
      let element = document.getElementById('viewDetails');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }

  modifyContent(id: any) {
    this.modifyCourseData = this.tableContents.filter((x) => x.id === id);
    setTimeout(() => {
      let element = document.getElementById('modifyDetails');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }

  addData() {
    this.showAdd = true;
    this.modifyCourseData = [];
    setTimeout(() => {
      let element = document.getElementById('addDetails');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }

  submitChanges() {
    this.tableContents.map((x) => {
      if (x.id === this.modifyCourseData[0].id) {
        x.title =
          this.title?.length > 0 ? this.title : this.modifyCourseData[0].title;
        x.description =
          this.description?.length > 0
            ? this.description
            : this.modifyCourseData[0].description;
        x.duration =
          this.duration?.length > 0
            ? this.duration
            : this.modifyCourseData[0].dashboard;
      }
    });
    this.modifyCourseData = [];
  }

  addCourse() {
    let value = {
      id: this.tableContents.length + 1,
      isMaterial: false,
      trainer: 'Trainer 1',
      type: this.type,
      duration: this.duration,
      title: this.title,
      description: this.description,
      date: '25/01/2024',
    };
    this.tableContents.push(value);
    this.title = this.description = this.duration = '';
    this.showAdd = false;
  }

  deleteCourse(id: any) {
    let index = this.tableContents.findIndex((x) => x.id === id);
    this.tableContents.splice(index, 1);
    this.modifyCourseData = [];
  }

  onKey(event, type) {
    if (type === 'title') {
      this.title = event.target.value;
    } else if (type === 'type') {
      this.type = event.target.value;
    } else if (type === 'description') {
      this.description = event.target.value;
    } else if (type === 'duration') {
      this.duration = event.target.value;
    }
  }

  viewEnquiry(id: any) {
    this.viewEnquiryData = this.studentsCourseData.filter((x) => x.id === id);
    setTimeout(() => {
      let element = document.getElementById('viewDetails');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }
}
