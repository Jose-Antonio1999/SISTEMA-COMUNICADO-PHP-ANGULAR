import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAlumnadoComponent } from './lista-alumnado.component';

describe('ListaAlumnadoComponent', () => {
  let component: ListaAlumnadoComponent;
  let fixture: ComponentFixture<ListaAlumnadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaAlumnadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaAlumnadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
