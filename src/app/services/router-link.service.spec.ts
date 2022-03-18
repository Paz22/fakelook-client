import { TestBed } from '@angular/core/testing';

import { RouterLinkService } from './router-link.service';

describe('RouterLinkService', () => {
  let service: RouterLinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouterLinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
