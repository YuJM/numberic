import { TestBed, inject } from '@angular/core/testing';

import { NumbericService } from './numberic.service';

describe('NumbericService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NumbericService]
    });
  });

  it('should be created', inject([NumbericService], (service: NumbericService) => {
    expect(service).toBeTruthy();
  }));
});
