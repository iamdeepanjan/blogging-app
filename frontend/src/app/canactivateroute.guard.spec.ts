import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { canactivaterouteGuard } from './canactivateroute.guard';

describe('canactivaterouteGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => canactivaterouteGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
