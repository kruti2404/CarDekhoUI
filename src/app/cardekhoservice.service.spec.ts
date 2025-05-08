import { TestBed } from '@angular/core/testing';

import { CardekhoserviceService } from './cardekhoservice.service';

describe('CardekhoserviceService', () => {
  let service: CardekhoserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardekhoserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
