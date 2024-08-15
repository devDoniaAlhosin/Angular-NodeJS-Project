import { TestBed } from '@angular/core/testing';

import { GenresServiceService } from './genres-service.service';

describe('GenresServiceService', () => {
  let service: GenresServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenresServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
