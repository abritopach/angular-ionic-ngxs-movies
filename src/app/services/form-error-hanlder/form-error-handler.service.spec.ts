import { TestBed } from '@angular/core/testing';

import { FormErrorHandlerService } from './form-error-handler.service';

describe('FormErrorHandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormErrorHandlerService = TestBed.get(FormErrorHandlerService);
    expect(service).toBeTruthy();
  });
});
