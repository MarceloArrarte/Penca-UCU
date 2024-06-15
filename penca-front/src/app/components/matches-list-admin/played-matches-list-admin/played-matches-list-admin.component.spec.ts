import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayedMatchesListAdminComponent } from './played-matches-list-admin.component';

describe('PlayedMatchesListAdminComponent', () => {
  let component: PlayedMatchesListAdminComponent;
  let fixture: ComponentFixture<PlayedMatchesListAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayedMatchesListAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayedMatchesListAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
