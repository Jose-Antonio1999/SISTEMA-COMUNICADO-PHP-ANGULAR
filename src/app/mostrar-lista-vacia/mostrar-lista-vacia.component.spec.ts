import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarListaVaciaComponent } from './mostrar-lista-vacia.component';

describe('MostrarListaVaciaComponent', () => {
  let component: MostrarListaVaciaComponent;
  let fixture: ComponentFixture<MostrarListaVaciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostrarListaVaciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarListaVaciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
