import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDocentesTutoresComponent } from './lista-docentes-tutores.component';

describe('ListaDocentesTutoresComponent', () => {
  let component: ListaDocentesTutoresComponent;
  let fixture: ComponentFixture<ListaDocentesTutoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaDocentesTutoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDocentesTutoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
