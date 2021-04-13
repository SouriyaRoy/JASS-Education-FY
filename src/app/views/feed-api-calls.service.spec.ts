import { TestBed } from '@angular/core/testing';

import { FeedApiCallsService } from './feed-api-calls.service';

describe('FeedApiCallsService', () => {
  let service: FeedApiCallsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeedApiCallsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
