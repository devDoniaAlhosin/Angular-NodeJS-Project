import { TestBed } from '@angular/core/testing';

import { BookService } from './book-services.service';

describe('BookServicesService', () => {
  let service:BookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
