import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingMatchesListComponent } from './upcoming-matches-list.component';

describe('UpcomingMatchesListComponent', () => {
  let component: UpcomingMatchesListComponent;
  let fixture: ComponentFixture<UpcomingMatchesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpcomingMatchesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpcomingMatchesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
