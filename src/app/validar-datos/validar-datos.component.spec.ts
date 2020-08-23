import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidarDatosComponent } from './validar-datos.component';

describe('ValidarDatosComponent', () => {
  let component: ValidarDatosComponent;
  let fixture: ComponentFixture<ValidarDatosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidarDatosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidarDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
