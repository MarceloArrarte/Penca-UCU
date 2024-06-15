import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchesListAdminComponent } from './matches-list-admin.component';

describe('MatchesListAdminComponent', () => {
  let component: MatchesListAdminComponent;
  let fixture: ComponentFixture<MatchesListAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchesListAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchesListAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
