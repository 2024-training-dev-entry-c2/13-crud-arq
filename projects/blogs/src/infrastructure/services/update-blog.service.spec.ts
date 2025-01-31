import { TestBed } from '@angular/core/testing';

import { UpdateBlogService } from './update-blog.service';

describe('UpdateBlogService', () => {
  let service: UpdateBlogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateBlogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
