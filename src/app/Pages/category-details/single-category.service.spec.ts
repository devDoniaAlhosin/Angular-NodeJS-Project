import { TestBed } from '@angular/core/testing';
import { SingleCategoryService } from './single-category.service';

describe('SingleCategoryService', () => {
  let service: SingleCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SingleCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
