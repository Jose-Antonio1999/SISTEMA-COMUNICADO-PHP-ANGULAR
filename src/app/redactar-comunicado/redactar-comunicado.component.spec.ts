import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedactarComunicadoComponent } from './redactar-comunicado.component';

describe('RedactarComunicadoComponent', () => {
  let component: RedactarComunicadoComponent;
  let fixture: ComponentFixture<RedactarComunicadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedactarComunicadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedactarComunicadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
