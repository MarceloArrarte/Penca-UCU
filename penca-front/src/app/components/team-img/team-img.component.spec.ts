import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamImgComponent } from './team-img.component';

describe('TeamImgComponent', () => {
  let component: TeamImgComponent;
  let fixture: ComponentFixture<TeamImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamImgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
