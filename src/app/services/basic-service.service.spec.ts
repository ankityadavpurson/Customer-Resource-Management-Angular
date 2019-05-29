import { TestBed } from '@angular/core/testing';

import { BasicServiceService } from './basic-service.service';

describe('BasicServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BasicServiceService = TestBed.get(BasicServiceService);
    expect(service).toBeTruthy();
  });
});
