import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpDownInputComponent } from './up-down-input.component';

describe('UpDownInputComponent', () => {
  let component: UpDownInputComponent;
  let fixture: ComponentFixture<UpDownInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpDownInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpDownInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
