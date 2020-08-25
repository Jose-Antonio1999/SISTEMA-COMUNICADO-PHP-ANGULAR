import { TestBed } from '@angular/core/testing';

import { ServiceMensajeService } from './service-mensaje.service';

describe('ServiceMensajeService', () => {
  let service: ServiceMensajeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceMensajeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
