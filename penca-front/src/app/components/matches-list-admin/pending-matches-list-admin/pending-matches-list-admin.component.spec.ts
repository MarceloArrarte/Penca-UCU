import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingMatchesListAdminComponent } from './pending-matches-list-admin.component';

describe('PendingMatchesListAdminComponent', () => {
  let component: PendingMatchesListAdminComponent;
  let fixture: ComponentFixture<PendingMatchesListAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingMatchesListAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingMatchesListAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
