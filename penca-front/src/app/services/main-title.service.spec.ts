import { TestBed } from '@angular/core/testing';

import { MainTitleService } from './main-title.service';

describe('MainTitleService', () => {
  let service: MainTitleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainTitleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
