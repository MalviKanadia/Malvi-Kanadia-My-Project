import { TestBed } from '@angular/core/testing';

import { MyStoreService } from './my-store.service';

describe('MyStoreService', () => {
  let service: MyStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
