import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayedMatchesListComponent } from './played-matches-list.component';

describe('PlayedMatchesListComponent', () => {
  let component: PlayedMatchesListComponent;
  let fixture: ComponentFixture<PlayedMatchesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayedMatchesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayedMatchesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
