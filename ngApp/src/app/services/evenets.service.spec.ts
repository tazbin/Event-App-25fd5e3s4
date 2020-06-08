import { TestBed } from '@angular/core/testing';

import { EvenetsService } from './evenets.service';

describe('EvenetsService', () => {
  let service: EvenetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvenetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
