import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllEnquiryComponent } from './all-enquiry.component';

describe('AllEnquiryComponent', () => {
  let component: AllEnquiryComponent;
  let fixture: ComponentFixture<AllEnquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllEnquiryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllEnquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
