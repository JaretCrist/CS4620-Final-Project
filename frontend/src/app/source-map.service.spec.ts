import { TestBed } from '@angular/core/testing';

import { SourceMapService } from './source-map.service';

describe('SourceMapService', () => {
  let service: SourceMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SourceMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
