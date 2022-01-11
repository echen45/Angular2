import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotpasswordmodalComponent } from './forgotpasswordmodal.component';

describe('ForgotpasswordmodalComponent', () => {
  let component: ForgotpasswordmodalComponent;
  let fixture: ComponentFixture<ForgotpasswordmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotpasswordmodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotpasswordmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
