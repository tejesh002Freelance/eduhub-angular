import { Component } from '@angular/core';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss'],
})
export class StudentDashboardComponent {
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
  public viewEnquiryData: any[] = [];
  public selectedTab: string = 'tab1';

  public enquiry: string = '';
  public showAdd = false;

  changeTab(tab: string) {
    this.selectedTab = tab;
    this.viewCourseData = [];
  }

  viewCourse(id: any) {
    this.viewCourseData = this.tableContents.filter((x) => x.id === id);
    setTimeout(() => {
      let element = document.getElementById('viewCourse');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }

  viewCourseDetails(id: any) {
    this.viewCourseData = this.tableContents.filter((x) => x.id === id);
    setTimeout(() => {
      let element = document.getElementById('viewDetails');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
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

  onKey(event, type) {
    if (type === 'enquiry') {
      this.enquiry = event.target.value;
    }
  }

  scroll() {
    this.showAdd = true;
    setTimeout(() => {
      let element = document.getElementById('addDetails');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }

  addEnquiry(courseId: any) {
    let studentData = {
      id: this.studentsCourseData.length + 1,
      studentName: 'Student' + this.studentsCourseData.length + 1,
      courseId: courseId,
      enquiry: this.enquiry,
      requestDate: '25/01/2024',
    };
    this.studentsCourseData.push(studentData);
    this.showAdd = false;
  }
}
