import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomMatOptionComponent } from './custom-mat-option.component';

describe('CustomMatOptionComponent', () => {
  let component: CustomMatOptionComponent;
  let fixture: ComponentFixture<CustomMatOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomMatOptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomMatOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
